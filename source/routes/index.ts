import express from 'express';
import test from './test';
import * as test from './test';

const router = express.Router();

test.exports = class test{
    router.use('/test', test);
}


export default router;
