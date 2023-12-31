import express from 'express';
import { dodajZahtevekInOdgovorPodUporabnika } from '../controllers/chatGPT';

const chatGPTRouter = express.Router();

chatGPTRouter.post('/:id', dodajZahtevekInOdgovorPodUporabnika);

export default chatGPTRouter;