import express from 'express';
import { pridobiVseOdgovore, pridobiOdgovorId, pridobiOdgovorInZahtevek, pridobiOdgovoreInZahtevkeUporabnika, pridobiOdgovoreUporabnika } from '../controllers/odgovor';


const odgovorRouter = express.Router();

odgovorRouter.get('/', pridobiVseOdgovore);
odgovorRouter.get('/:id', pridobiOdgovorId)
odgovorRouter.get('/odgovor-zahtevek/:id', pridobiOdgovorInZahtevek)
odgovorRouter.get('/vse/:uporabnikID', pridobiOdgovoreInZahtevkeUporabnika)
odgovorRouter.get('/odgovori-uporabnika/:uporabnikID', pridobiOdgovoreUporabnika)


export default odgovorRouter;