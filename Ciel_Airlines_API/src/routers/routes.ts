import express, { Request, Response } from 'express';
//const AeronaveController = require('./Ciel_Airlines/src/controllers/AeronaveController.ts');
export const router = express.Router();
/*
//cadastra aeronave
router.post('/post-aeronave', AeronaveController.cadastrar);

//retorna todos as aeronaves
router.get('/get-aeronave', AeronaveController.getAeronave);
*/
router.get('/',(req:any, res:any) => {
    return res.json({mensagem: "Api atualizada"});
})
