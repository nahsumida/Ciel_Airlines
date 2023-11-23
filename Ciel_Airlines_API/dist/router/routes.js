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
/*
// AERNAVE
route.get("/selectAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectAeronaveByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});*/
/*
// AEROPORTO
route.get("/selectAeroport", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectAeroportoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});
*/
/*
// ASSENTO
route.get("/selectAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectAssentoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});
*/
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
exports.route.get("/selectCidadeByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.get("/deleteCidade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined };
    const id = req.body.idCidade;
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
exports.route.get("/insertCompanhiaAerea", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.get("/selectMetodoPagamentoByID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.get("/deleteMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.get("/updateMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.route.get("/insertMetodoPagamento", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
/*
// TRECHO
route.get("/selectTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectTrechoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});
*/
/*
// VENDA
route.get("/selectVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectVendaByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});
*/
/*
// VOO
route.get("/selectVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectVooByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

//pesquisa de voos de um trecho especifico filtrado por data
// dia x trecho y( trecho vem pelo req)
route.get("/selectVooByDate", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});
*/ 
