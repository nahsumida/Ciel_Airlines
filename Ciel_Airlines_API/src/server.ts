import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { router } from './routers/routes';
import { aeronaveRouter } from './routers/aeronave';
import { aeroportoRouter } from './routers/aeroporto';
import { cidadeRouter } from './routers/cidade';
import { companhiaAereaRouter } from './routers/companhiaAerea';
import { mapaAssentoRouter } from './routers/mapaAssento';
import { metodoPagamentoRouter } from './routers/metPagamento';
import { trechoRouter } from './routers/trecho';
import { vendaRouter } from './routers/venda';
import { vooRouter } from './routers/voo';

dotenv.config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(router);
app.use(aeronaveRouter);
app.use(aeroportoRouter);
app.use(cidadeRouter);
app.use(companhiaAereaRouter);
app.use(mapaAssentoRouter);
app.use(metodoPagamentoRouter);
app.use(trechoRouter);
app.use(vendaRouter);
app.use(vooRouter);

const PORT = parseInt(`${process.env.PORT || 3000}`);
app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));