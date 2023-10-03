import { Request, Response, NextFunction } from 'express';
import axios, {AxiosResponse} from 'axios';

const testFunction = async (req: Request, res: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos/l')
    return res.send(result.data);
}