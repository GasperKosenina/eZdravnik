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
            id: uporabnikDoc.id,
            email: data.email ?? '',
            uid: data.uid ?? ''
        };

        res.status(200).json({ uporabnik });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};




