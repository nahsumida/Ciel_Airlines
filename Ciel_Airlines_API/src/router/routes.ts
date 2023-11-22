import express from "express";

import { executeSelectAll, executeSelectByID} from '../adapter/oraclebd/select';
import { executeDeleteByID} from '../adapter/oraclebd/delete';
import { executeInsertCompanhiaAerea, executeUpdateCompanhiaAerea } from "../adapter/oraclebd/insert";

import { CustomResponse } from '../model/customResponse';
export const route = express.Router();

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
});

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

// CIDADE 
route.get("/selectCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectCidadeByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

// COMPANHIA AEREA ////////
// seleciona todos os dados da tabela de companhia aerea
route.get("/selectCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectAll('COMPANHIA_AEREA');

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dados obtidos";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/selectCompanhiaAereaByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idCompanhiaAerea as number;

  let resp = executeSelectByID('COMPANHIA_AEREA', id);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dados obtidos";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/deleteCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idCompanhiaAerea as number;

  let resp = executeDeleteByID('COMPANHIA_AEREA', id);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado excluido";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/updateCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idCompanhiaAerea as number;
  const nomeCompanhia = req.body.nomeCompanhiaAerea as string;

  let resp = executeUpdateCompanhiaAerea(id, nomeCompanhia);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado inserido";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/insertCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const nomeCompanhia = req.body.nomeCompanhiaAerea as string;

  let resp = executeInsertCompanhiaAerea(nomeCompanhia);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado inserido";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

// METODO PAGAMENTO
route.get("/selectMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  res.send(cr);
});

route.get("/selectMetodoPagamentoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/deleteMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/updateMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

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
