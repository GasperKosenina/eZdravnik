import { Request, Response } from 'express';
import admin from '../config/firebaseConfig';
import Zahtevek from '../models/zahtevek';


const firestore = admin.firestore();

export const pridobiVseZahtevke = async (req: Request, res: Response): Promise<void> => {
    try {
        const zahtevkiCollection = firestore.collection('zahtevki');
        const zahtevkiSnapshot = await zahtevkiCollection.get();

        const zahtevki: Zahtevek[] = [];

        zahtevkiSnapshot.forEach((doc) => {
            const data = doc.data();
            const zahtevek: Zahtevek = {
                id: doc.id,
                spol: data.spol,
                datum_rojstva: data.datum_rojstva || '',
                opis_simptomov: data.opis_simptomov || '',
                zdravila: data.zdravila || '',
                alergije: data.alergije || '',
                bolezni_v_druzini: data.bolezni_v_druzini || '',
                dodatni_kontekst: data.dodatni_kontekst || '',
                zivljenjski_slog: data.zivljenjski_slog || '',
            };
            zahtevki.push(zahtevek);
        });

        res.status(200).json({ zahtevki });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const pridobiZahtevekId = async (req: Request, res: Response): Promise<void> => {
    try {
        const zahtevekId = req.params.id;
        const zahtevekRef = firestore.collection('zahtevki').doc(zahtevekId);
        const zahtevekDoc = await zahtevekRef.get();

        if (!zahtevekDoc.exists) {
            res.status(404).json({ message: 'Zahtevek ni bil najden' });
            return;
        }

        const data = zahtevekDoc.data();

        if (!data) {
            res.status(404).json({ message: 'Podatki za zahtevek niso definirani' });
            return;
        }

        const zahtevek: Zahtevek = {
            id: zahtevekDoc.id,
            spol: data.spol ?? false, 
            datum_rojstva: data.datum_rojstva ?? '',
            opis_simptomov: data.opis_simptomov ?? '',
            zdravila: data.zdravila ?? '',
            alergije: data.alergije ?? '',
            bolezni_v_druzini: data.bolezni_v_druzini ?? '',
            dodatni_kontekst: data.dodatni_kontekst ?? '',
            zivljenjski_slog: data.zivljenjski_slog ?? '',
        };

        res.status(200).json({ zahtevek });
    } catch (error) {
        res.status(500).json({ error: error});
    }
};





