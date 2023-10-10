"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
//const AeronaveController = require('./Ciel_Airlines/src/controllers/AeronaveController.ts');
exports.router = express_1.default.Router();
/*
//cadastra aeronave
router.post('/post-aeronave', AeronaveController.cadastrar);

//retorna todos as aeronaves
router.get('/get-aeronave', AeronaveController.getAeronave);
*/
exports.router.get('/', (req, res) => {
    return res.json({ mensagem: "Api atualizada" });
});
