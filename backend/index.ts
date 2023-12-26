import 'dotenv/config';
import express, { Request, Response } from 'express';
import zahtevekRouter from './routes/zahtevek';
import odgovorRouter from './routes/odgovor';
import uporabnikRouter from './routes/uporabnik';
import syncUsers from './shranjevanjeUporabnika/shrajevanje';


const app = express();
const port = process.env.PORT;

//syncUsers();


app.use('/zahtevki', zahtevekRouter);
app.use('/odgovori', odgovorRouter)
app.use('/uporabniki', uporabnikRouter)


app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});