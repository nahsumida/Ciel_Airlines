import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { route } from './router/routes';
import { aeronaveRouter } from './router/aeronave';
import { aeroportoRouter } from './router/aeroporto';
import { cidadeRouter } from './router/cidade';
//import { companhiaAereaRouter } from './router/companhiaAerea';
import { mapaAssentoRouter } from './router/mapaAssento';
import { metodoPagamentoRouter } from './router/metPagamento';
import { trechoRouter } from './router/trecho';
import { vendaRouter } from './router/venda';
import { vooRouter } from './router/voo';

dotenv.config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(route);
app.use(aeronaveRouter);
app.use(aeroportoRouter);
app.use(cidadeRouter);
//app.use(companhiaAereaRouter);
app.use(mapaAssentoRouter);
app.use(metodoPagamentoRouter);
app.use(trechoRouter);
app.use(vendaRouter);
app.use(vooRouter);

const PORT = parseInt(`${process.env.PORT || 3000}`);
app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));