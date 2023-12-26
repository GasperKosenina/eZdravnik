import express from 'express';
import { pridobiUporabnikId } from '../controllers/uporabnik';

const uporabnikRouter = express.Router();


uporabnikRouter.get('/:uid', pridobiUporabnikId)

export default uporabnikRouter

