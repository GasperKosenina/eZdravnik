import { Request, Response } from 'express';
import admin from '../config/firebaseConfig';
import Odgovor from '../models/odgovor';
import Zahtevek from '../models/zahtevek';
import Uporabnik from '../models/uporabnik';

const firestore = admin.firestore();

export const pridobiVseOdgovore = async (req: Request, res: Response): Promise<void> => {
    try {
        const odgovoriCollection = firestore.collection('odgovori');
        const odgovoriSnapshot = await odgovoriCollection.get();

        const odgovori: Odgovor[] = [];

        odgovoriSnapshot.forEach((doc) => {
            const data = doc.data();
            const odgovor: Odgovor = {
                id: doc.id,
                odgovor: data.odgovor || '',
                zahtevekID: data.zahtevekID || '',
                uporabnikID: data.uporabnikID || ''
            };
            odgovori.push(odgovor);
        });

        res.status(200).json({ odgovori });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const pridobiOdgovorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const odgovorId = req.params.id;
        const odgovorRef = firestore.collection('odgovori').doc(odgovorId);
        const odgovorDoc = await odgovorRef.get();

        if (!odgovorDoc.exists) {
            res.status(404).json({ message: 'Odgovor ni bil najden' });
            return;
        }

        const data = odgovorDoc.data();

        if (!data) {
            res.status(404).json({ message: 'Podatki za odgovor niso definirani' });
            return;
        }

        const odgovor: Odgovor = {
            id: odgovorDoc.id,
            odgovor: data.odgovor || '',
            zahtevekID: data.zahtevekID || '',
            uporabnikID: data.uporabnikID || ''
        };

        res.status(200).json({ odgovor });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const pridobiOdgovorInZahtevek = async (req: Request, res: Response): Promise<void> => {
    try {
        const odgovorId = req.params.id;

        const odgovorRef = firestore.collection('odgovori').doc(odgovorId);
        const odgovorDoc = await odgovorRef.get();

        if (!odgovorDoc.exists) {
            res.status(404).json({ message: 'Odgovor ni bil najden' });
            return;
        }

        const odgovorData = odgovorDoc.data() as Odgovor;
        const zahtevekId = odgovorData.zahtevekID;

        const zahtevekRef = firestore.collection('zahtevki').doc(zahtevekId);
        const zahtevekDoc = await zahtevekRef.get();

        if (!zahtevekDoc.exists) {
            res.status(404).json({ message: 'Povezan zahtevek ni bil najden' });
            return;
        }

        const zahtevekData = zahtevekDoc.data() as Zahtevek;

        const odgovor: Odgovor = {
            id: odgovorDoc.id,
            odgovor: odgovorData.odgovor || '',
            zahtevekID: odgovorData.zahtevekID || '',
            uporabnikID: odgovorData.uporabnikID || ''
        };

        const povezanZahtevek: Zahtevek = {
            id: zahtevekDoc.id,
            spol: zahtevekData.spol || false,
            datum_rojstva: zahtevekData.datum_rojstva || '',
            opis_simptomov: zahtevekData.opis_simptomov || '',
            zdravila: zahtevekData.zdravila || '',
            alergije: zahtevekData.alergije || '',
            bolezni_v_druzini: zahtevekData.bolezni_v_druzini || '',
            dodatni_kontekst: zahtevekData.dodatni_kontekst || '',
            zivljenjski_slog: zahtevekData.zivljenjski_slog || '',
        };

        res.status(200).json({ odgovor, zahtevek: povezanZahtevek });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};



export const pridobiOdgovoreInZahtevkeUporabnika = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uporabnikID } = req.params;
        const odgovoriCollection = firestore.collection('odgovori');
        const odgovoriSnapshot = await odgovoriCollection.where('uporabnikID', '==', uporabnikID).get();

        const odgovor_zahtevek: { odgovor: Odgovor, zahtevek: Zahtevek }[] = [];

        for (const doc of odgovoriSnapshot.docs) {
            const odgovorData = doc.data() as Odgovor;
            const zahtevekID = odgovorData.zahtevekID;
            const zahtevekDoc = await firestore.collection('zahtevki').doc(zahtevekID).get();

            if (zahtevekDoc.exists) {
                const zahtevekData = zahtevekDoc.data() as Zahtevek;

                const odgovor: Odgovor = {
                    id: doc.id,
                    odgovor: odgovorData.odgovor || '',
                    zahtevekID: odgovorData.zahtevekID || '',
                    uporabnikID: odgovorData.uporabnikID || ''
                };

                const povezanZahtevek: Zahtevek = {
                    id: zahtevekDoc.id,
                    spol: zahtevekData.spol || false,
                    datum_rojstva: zahtevekData.datum_rojstva || '',
                    opis_simptomov: zahtevekData.opis_simptomov || '',
                    zdravila: zahtevekData.zdravila || '',
                    alergije: zahtevekData.alergije || '',
                    bolezni_v_druzini: zahtevekData.bolezni_v_druzini || '',
                    dodatni_kontekst: zahtevekData.dodatni_kontekst || '',
                    zivljenjski_slog: zahtevekData.zivljenjski_slog || '',
                };

                odgovor_zahtevek.push({ odgovor, zahtevek: povezanZahtevek });
            }
        }

        res.status(200).json({ odgovor_zahtevek });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const pridobiOdgovoreUporabnika = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uporabnikID } = req.params;

        if (!uporabnikID) {
            res.status(400).json({ error: 'Missing uporabnikID parameter' });
            return;
        }

        const odgovoriCollection = firestore.collection('odgovori');
        const odgovoriSnapshot = await odgovoriCollection.where('uporabnikID', '==', uporabnikID).get();

        if (odgovoriSnapshot.empty) {
            res.status(404).json({ error: 'No responses found for the specified user' });
            return;
        }

        const odgovori: Odgovor[] = [];

        odgovoriSnapshot.forEach((doc) => {
            const data = doc.data();
            const odgovor: Odgovor = {
                id: doc.id,
                odgovor: data.odgovor || '',
                zahtevekID: data.zahtevekID || '',
                uporabnikID: data.uporabnikID || ''
            };
            odgovori.push(odgovor);
        });

        res.status(200).json({ odgovori });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};













