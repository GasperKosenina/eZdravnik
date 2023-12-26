import express from 'express';
import { pridobiVseZahtevke, pridobiZahtevekId } from '../controllers/zahtevek';

const zahtevekRouter = express.Router();


zahtevekRouter.get('/', pridobiVseZahtevke);
zahtevekRouter.get('/:id', pridobiZahtevekId)

export default zahtevekRouter;
