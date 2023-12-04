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
const update_1 = require("../adapter/oraclebd/update");
exports.route = express_1.default.Router();
// SEARCH 
//pesquisa de voos de um trecho especifico filtrado por data
// dia x trecho y( trecho vem pelo req)
exports.route.post("/searchVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const aeroSaida = req.body.aeroSaida;
    const aeroChegada = req.body.aeroChegada;
    const dataVoo = req.body.dataVoo;
    console.log(aeroSaida, aeroChegada, dataVoo);
    let respTrecho = (0, select_1.searchTrecho)(aeroSaida, aeroChegada);
    if ((yield respTrecho).err != null) {
        cr.message = (yield respTrecho).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    else if ((yield respTrecho).result === 0) {
        cr.status = "ERROR";
        cr.message = "ZERO RESULTADOS";
        res.send(cr);
    }
    else {
        let respVoo = (0, select_1.searchVoo)((yield respTrecho).result[0], dataVoo);
        if ((yield respVoo).err != null) {
            cr.message = (yield respVoo).err;
            cr.status = "ERROR";
            res.send(cr);
        }
        cr.payload = (yield respVoo).result;
        cr.message = "Dado encontrado";
        cr.status = "SUCCESS";
        res.send(cr);
    }
}));
// VENDA
exports.route.get("/selectVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectVenda)();
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
exports.route.post("/selectVendaByAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAssento;
    console.log(id);
    let resp = (0, select_1.executeSelectVendaByAssento)(id);
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
exports.route.delete("/deleteVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idVenda;
    // mudaro a funcao de venda para atualizar o assento do voo 
    let resp = (0, delete_1.executeDeleteByID)('VENDA', id);
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
exports.route.put("/insertVenda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const nome = req.body.nome;
    const email = req.body.email;
    const idAssento = req.body.idAssento;
    const idVoo = req.body.idVoo;
    const pagamento = req.body.idMetodo;
    if (nome === undefined) {
        cr.message = "valor invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
    if (email === undefined) {
        cr.message = "valor invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
    let resp = (0, insert_1.executeInsertVenda)(nome, email, idAssento, idVoo, pagamento);
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
// VOO
exports.route.get("/selectVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectVoo)();
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
exports.route.get("/selectVooByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idVoo;
    console.log(id);
    let resp = (0, select_1.executeSelectVooByID)(id);
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
exports.route.get("/deleteVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idVoo;
    let resp = (0, delete_1.executeDeleteByID)('VOO', id);
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
exports.route.post("/updateVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let id = req.body.idAeroporto;
    const idCidade = req.body.idCidade;
    const nomeAeroporto = req.body.nomeAeroporto;
    const sigla = req.body.sigla;
    let resp = (0, update_1.executeUpdateVoo)(id, idCidade, nomeAeroporto, sigla);
    console.log(resp);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    else {
        cr.payload = (yield resp).result;
        cr.message = "Dado inserido";
        cr.status = "SUCCESS";
        res.send(cr);
    }
}));
exports.route.put("/insertVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const trecho = req.body.trecho;
    const aeronave = req.body.aeronave;
    const dataVoo = req.body.dataVoo;
    const horaPartida = req.body.horaPartida;
    const horaChegada = req.body.horaChegada;
    const preco = req.body.preco;
    let resp = (0, insert_1.executeInsertVoo)(trecho, aeronave, dataVoo, horaPartida, horaChegada, preco);
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
// AERNAVE
exports.route.get("/selectAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectAeronave)();
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
exports.route.post("/selectAeronaveByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAeronave;
    console.log(id);
    let resp = (0, select_1.executeSelectAeronaveByID)(id);
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
exports.route.delete("/deleteAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAeronave;
    let resp = (0, delete_1.executeDeleteByID)('AERONAVE', id);
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
exports.route.post("/updateAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let id = req.body.idAeronave;
    const modelo = req.body.modelo;
    const numIdentificacao = req.body.numIdentificacao;
    const fabricante = req.body.fabricante;
    const anoFabricacao = req.body.anoFabricacao;
    const compahiaAerea = req.body.compahiaAerea;
    let resp = (0, update_1.executeUpdateAeronave)(id, modelo, numIdentificacao, fabricante, anoFabricacao, compahiaAerea);
    console.log(resp);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    else {
        cr.payload = (yield resp).result;
        cr.message = "Dado inserido";
        cr.status = "SUCCESS";
        res.send(cr);
    }
}));
exports.route.put("/insertAeronave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const modelo = req.body.modelo;
    const numIdentificacao = req.body.numIdentificacao;
    const fabricante = req.body.fabricante;
    const anoFabricacao = req.body.anoFabricacao;
    const compahiaAerea = req.body.compahiaAerea;
    const numAssento = req.body.numAssento;
    let resp = (0, insert_1.executeInsertAeronave)(modelo, numIdentificacao, fabricante, anoFabricacao, compahiaAerea, numAssento);
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
// AEROPORTO
exports.route.post("/selectAeroportoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAeroporto;
    console.log(id);
    let resp = (0, select_1.executeSelectAeroportoByID)(id);
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
exports.route.get("/selectAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectAeroporto)();
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
exports.route.delete("/deleteAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAeroporto;
    let resp = (0, delete_1.executeDeleteByID)('AEROPORTO', id);
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
exports.route.post("/updateAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let id = req.body.idAeroporto;
    const idCidade = req.body.idCidade;
    const nomeAeroporto = req.body.nomeAeroporto;
    const sigla = req.body.sigla;
    let resp = (0, update_1.executeUpdateAeroporto)(id, idCidade, nomeAeroporto, sigla);
    console.log(resp);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    else {
        cr.payload = (yield resp).result;
        cr.message = "Dado inserido";
        cr.status = "SUCCESS";
        res.send(cr);
    }
}));
exports.route.put("/insertAeroporto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const idCidade = req.body.idCidade;
    const nomeAeroporto = req.body.nomeAeroporto;
    const sigla = req.body.sigla;
    if (nomeAeroporto === undefined) {
        cr.message = "nome aeroporto invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
    if (sigla === undefined) {
        cr.message = "sigla invalida";
        cr.status = "ERROR";
        res.send(cr);
    }
    let resp = (0, insert_1.executeInsertAeroporto)(idCidade, nomeAeroporto, sigla);
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
// ASSENTO
exports.route.post("/selectAssentoByVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const idVoo = req.body.idVoo;
    let resp = (0, select_1.executeSelectAssentoByVoo)('ASSENTO', idVoo);
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
exports.route.post("/selectAssentoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAssento;
    let resp = (0, select_1.executeSelectByID)('ASSENTO', id);
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
exports.route.post("/updateAssento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idAssento;
    const status = req.body.status;
    if (status === 'undefined') {
        cr.message = "valor invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
    let resp = (0, update_1.executeUpdateAssento)(id, status);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado alterado";
    cr.status = "SUCCESS";
    res.send(cr);
}));
// CIDADE 
exports.route.get("/selectCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectAll)('CIDADE');
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
exports.route.post("/selectCidadeByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCidade;
    let resp = (0, select_1.executeSelectByID)('CIDADE', id);
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
exports.route.delete("/deleteCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCidade;
    console.log(id);
    let resp = (0, delete_1.executeDeleteByID)('CIDADE', id);
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
exports.route.post("/updateCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCidade;
    const nomeCompanhia = req.body.nomeCidade;
    let resp = (0, update_1.executeUpdateCidade)(id, nomeCompanhia);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado alterado";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.put("/insertCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const nomeCidade = req.body.nomeCidade;
    if (nomeCidade === undefined) {
        cr.message = "valor invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
    let resp = (0, insert_1.executeInsertCidade)(nomeCidade);
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
// COMPANHIA AEREA ////////
exports.route.get("/selectCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectAll)('Companhia_aerea');
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
exports.route.post("/selectCompanhiaAereaByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.post("/deleteCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.post("/updateCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCompanhiaAerea;
    const nomeCompanhia = req.body.nomeCompanhiaAerea;
    let resp = (0, update_1.executeUpdateCompanhiaAerea)(id, nomeCompanhia);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado alterado";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.put("/insertCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const nomeCompanhia = req.body.nomeCompanhiaAerea;
    if (nomeCompanhia === undefined) {
        cr.message = "valor invalido";
        cr.status = "ERROR";
        res.send(cr);
    }
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
    let resp = (0, select_1.executeSelectAll)('METODO_PAGAMENTO');
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
exports.route.post("/selectMetodoPagamentoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idMetodoPagamento;
    let resp = (0, select_1.executeSelectByID)('METODO_PAGAMENTO', id);
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
exports.route.delete("/deleteMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idMetodoPagamento;
    let resp = (0, delete_1.executeDeleteByID)('METODO_PAGAMENTO', id);
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
exports.route.post("/updateMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idMetodoPagamento;
    const nomeMetodo = req.body.nomeMetodoPagamento;
    let resp = (0, update_1.executeUpdateMetodoPagamento)(id, nomeMetodo);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado alterado";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.put("/insertMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idMetodoPagamento;
    const nomeMetodo = req.body.nomeMetodoPagamento;
    let resp = (0, insert_1.executeInsertMetodoPagamento)(nomeMetodo);
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
// TRECHO
exports.route.get("/selectTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    let resp = (0, select_1.executeSelectTrecho)();
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
exports.route.post("/selectTrechoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idTrecho;
    let resp = (0, select_1.executeSelectTrechoByID)(id);
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
exports.route.delete("/deleteTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idTrecho;
    let resp = (0, delete_1.executeDeleteByID)('TRECHO', id);
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
exports.route.post("/updateTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idTrecho;
    const aeroSaida = req.body.aeroSaida;
    const aeroChegada = req.body.aeroChegada;
    let resp = (0, update_1.executeUpdateTrecho)(id, aeroSaida, aeroChegada);
    if ((yield resp).err != null) {
        cr.message = (yield resp).err;
        cr.status = "ERROR";
        res.send(cr);
    }
    cr.payload = (yield resp).result;
    cr.message = "Dado alterado";
    cr.status = "SUCCESS";
    res.send(cr);
}));
exports.route.put("/insertTrecho", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const aeroSaida = req.body.aeroSaida;
    const aeroChegada = req.body.aeroChegada;
    let resp = (0, insert_1.executeInsertTrecho)(aeroSaida, aeroChegada);
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
