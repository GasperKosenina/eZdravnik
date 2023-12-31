import express from 'express';
import { pridobiVseOdgovore, pridobiOdgovorId, pridobiOdgovorInZahtevek, pridobiOdgovoreInZahtevkeUporabnika} from '../controllers/odgovor';


const odgovorRouter = express.Router();

odgovorRouter.get('/', pridobiVseOdgovore);
odgovorRouter.get('/:id', pridobiOdgovorId)
odgovorRouter.get('/odgovor-zahtevek/:id', pridobiOdgovorInZahtevek)
odgovorRouter.get('/vse/:uporabnikID', pridobiOdgovoreInZahtevkeUporabnika)


export default odgovorRouter;