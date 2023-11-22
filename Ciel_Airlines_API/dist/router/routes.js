"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const select_1 = require("../adapter/oraclebd/select");
const delete_1 = require("../adapter/oraclebd/delete");
const insert_1 = require("../adapter/oraclebd/insert");
exports.route = express_1.default.Router();
// AERNAVE
exports.route.get("/selectAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectAeronaveByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// AEROPORTO
exports.route.get("/selectAeroport", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectAeroportoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// ASSENTO
exports.route.get("/selectAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectAssentoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// CIDADE 
exports.route.get("/selectCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectCidadeByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// COMPANHIA AEREA ////////
// seleciona todos os dados da tabela de companhia aerea
exports.route.get("/selectCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectAll)('COMPANHIA_AEREA');
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dados obtidos";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.get("/selectCompanhiaAereaByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCompanhiaAerea;
    let resp = (0, select_1.executeSelectByID)('COMPANHIA_AEREA', id);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dados obtidos";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.get("/deleteCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCompanhiaAerea;
    let resp = (0, delete_1.executeDeleteByID)('COMPANHIA_AEREA', id);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado excluido";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.get("/updateCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const nomeCompanhia = req.body.nomeCompanhiaAerea;
    let resp = (0, insert_1.executeInsertCompanhiaAerea)(nomeCompanhia);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado inserido";
    cr.status = "SUCCESS";
    res.send(cr);
}));
// METODO PAGAMENTO
exports.route.get("/selectMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectMetodoPagamentoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// TRECHO
exports.route.get("/selectTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectTrechoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// VENDA
exports.route.get("/selectVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectVendaByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
// VOO
exports.route.get("/selectVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/selectVooByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
//pesquisa de voos de um trecho especifico filtrado por data
// dia x trecho y( trecho vem pelo req)
exports.route.get("/selectVooByDate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/deleteVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/updateVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
exports.route.get("/insertVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    res.send(cr);
}));
