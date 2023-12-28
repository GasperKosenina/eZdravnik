import express from 'express';
import { dodajZahtevekInOdgovorPodUporabnika } from '../controllers/chatGPT';

const chatGPTRouter = express.Router();

chatGPTRouter.post('/', dodajZahtevekInOdgovorPodUporabnika);

export default chatGPTRouter;