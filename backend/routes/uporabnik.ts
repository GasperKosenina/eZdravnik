import express from 'express';
import { pridobiUporabnikId, dodajUporabnika} from '../controllers/uporabnik';

const uporabnikRouter = express.Router();


uporabnikRouter.get('/:uid', pridobiUporabnikId)
uporabnikRouter.post('/', dodajUporabnika);


export default uporabnikRouter

