import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/index';
import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT){
    process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);


const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse (parametrizar) the request */
router.use(express.urlencoded({ extended: false}));
/**  Takes care of JSON data*/
router.use(express.json());

/** Rules of api */
router.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');

    res.header('Acces-Control-Allow-Origin', 'origin, X-Requester-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Origin', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Route */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
/**const PORT: any = process.env.PORT ?? 3000;*/
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
