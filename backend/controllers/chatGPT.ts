import { Request, Response } from 'express';
import request from 'request';
import Zahtevek from '../models/zahtevek';
import Odgovor from '../models/odgovor';
import admin from '../config/firebaseConfig';

const firestore = admin.firestore();

const pretvoriZahtevekVBesedilo = (zahtevek: Zahtevek): string => {

    let besedilo = "Pozdravljen. Obnasaj se kot osebni zdravnik, ki pomaga pacientu pri njegovih simpotmih. Pacient je " + (zahtevek.spol ? "moski" : "zenska") + " in se je rodil/la:  " + zahtevek.datum_rojstva + ".\n" + 
    "Pacient ima naslednje simptome: " + zahtevek.opis_simptomov + ".\n" + "Pacient jemlje naslednja zdravila: " + (zahtevek.zdravila ? zahtevek.zdravila : "Ne jemlje zdravil") + ".\n" + "Pacient ima naslednje alergije: " + (zahtevek.alergije ? zahtevek.alergije : "Nima alergij") + ".\n"
    + "Pacient ima v druzini naslednje bolezni: " + (zahtevek.bolezni_v_druzini ? zahtevek.bolezni_v_druzini : "Nima bolezni v druzini") + ".\n" + "Pacient ima naslednji zivljenjski slog: " + (zahtevek.zivljenjski_slog ? zahtevek.zivljenjski_slog : "Pacient ni opisal zivljenskega sloga") + ".\n" + "Pacient ima naslednji dodatni kontekst: " + (zahtevek.dodatni_kontekst ? zahtevek.dodatni_kontekst : "Nima dodatnega konteksta") + ".\n" 
    + " Prosim, da pacientu odgovoris cim bolj profesionalno in da mu pomagas pri njegovih tezavah. Prav tako, ce kateri koli podatki, ki jih je pacient posredoval niso v povezavi z medicino/tezavami pacienta jih lahko ignoriras. Odgovor oblikuj tako, da bo najbolj berljivo uporabniku. Na koncu lahko vedno dodas tudi obvestilo, da si le AI in naj se obrne na svojega osebnega zdravnika. In pa prosim, da pises v slovenskem jeziku. Prav tako poudari/okrepi najbolj pomebne podatke. In pa lahko izviras tudi iz kaksnih virov vendar jih na koncu navedi. Hvala."

    return besedilo;

}

const posiljanjeBesedilaChatGPT = async (besedilo: string): Promise<string> => {

const options = {
  method: 'POST',
  url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
  },
  body: {
    messages: [
      {
        role: 'user',
        content: besedilo
      }
    ],
    system_prompt: '',
    temperature: 0.5,
    top_k: 50,
    top_p: 0.9,
    max_tokens: 1000,
    web_access: false
  },
  json: true
};

return new Promise<string>((resolve, reject) => {
    const makeRequest = () => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                const result = body?.result;

                if (result && result.trim() !== '') {
                    resolve(result);
                } else {
                    setTimeout(makeRequest, 1000);
                }
            }
        });
    };

    makeRequest();
});

}

export const dodajZahtevekInOdgovorPodUporabnika = async (req: Request, res: Response): Promise<void> => {
    try {
        const zahtevek: Zahtevek = req.body;

        if (!zahtevek) {
            res.status(400).json({ error: "Zahtevek ni bil poslan" });
            return;
        }

        console.log(zahtevek);

        if (!zahtevek.datum_rojstva || !zahtevek.opis_simptomov) {
            res.status(400).json({ error: "Zahtevek mora vsebovati spol, datum rojstva in opis simptomov" });
            return;
        }

        const pretvorjenoBesedilo = pretvoriZahtevekVBesedilo(zahtevek);

        const besediloOdgovora: string = await posiljanjeBesedilaChatGPT(pretvorjenoBesedilo);

        if (!besediloOdgovora) {
            res.status(500).json({ error: "Prislo je do napake" });
            return;
        }

        const zahtevekRef = firestore.collection('zahtevki').doc();
        const zahtevekDoc = await zahtevekRef.set(zahtevek);

        const odgovor: Odgovor = {
            odgovor: besediloOdgovora,
            zahtevekID: zahtevekRef.id,
            uporabnikID: "oFVBroH4zRZeYvrFk328nvclJhg2" //Luka Prepadnik
        };

        const odgovorRef = firestore.collection('odgovori').doc();
        const odgovorDoc = await odgovorRef.set(odgovor);

        res.status(200).json({ odgovor: odgovor });
    }
    catch (error) {
        res.status(500).json({ error: "Prislo je do napake" });
    }

};