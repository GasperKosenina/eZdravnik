import { Request, Response } from 'express';
import admin from '../config/firebaseConfig';
import Uporabnik from '../models/uporabnik';

const firestore = admin.firestore();


export const pridobiUporabnikId = async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.params.uid;
        const uporabnikRef = firestore.collection('uporabniki').where('uid', '==', uid);
        const uporabnikiQuery = await uporabnikRef.get();

        if (uporabnikiQuery.empty) {
            res.status(404).json({ message: 'Uporabnik ni bil najden' });
            return;
        }

        const uporabnikDoc = uporabnikiQuery.docs[0];
        const data = uporabnikDoc.data();

        const uporabnik: Uporabnik = {
            email: data.email ?? '',
            uid: data.uid ?? '',
            display_name: data.display_name ?? ''
        };

        res.status(200).json({ uporabnik });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};


export const dodajUporabnika = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, uid, display_name } = req.body; 

        if (!email || !uid) {
            res.status(400).json({ message: 'Manjkajo obvezni podatki (email ali uid)' });
            return;
        }

        const uporabnikRef = firestore.collection('uporabniki').doc(uid);

        const existingDoc = await uporabnikRef.get();
        if (existingDoc.exists) {
            res.json({ message: 'Uporabnik s tem UID že obstaja' });
            return;
        }

        await uporabnikRef.set({ email, uid, display_name });

        res.status(201).json({ message: 'Uporabnik uspešno dodan' });
    } catch (error) {
        res.status(500).json({ error: 'Prišlo je do napake pri dodajanju uporabnika' });
    }
};







