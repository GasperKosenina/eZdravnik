import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import zahtevekRouter from './routes/zahtevek';
import odgovorRouter from './routes/odgovor';
import uporabnikRouter from './routes/uporabnik';
import syncUsers from './shranjevanjeUporabnika/shrajevanje';


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//syncUsers();


app.use('/zahtevki', zahtevekRouter);
app.use('/odgovori', odgovorRouter)
app.use('/uporabniki', uporabnikRouter)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});