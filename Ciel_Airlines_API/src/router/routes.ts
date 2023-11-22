import express from "express";
import { executeSelectAll, executeSelectByID, executeDeleteByID} from '../adapter/oraclebd/select';
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

  let esse = executeSelectAll('COMPANHIA_AEREA');

  if ((await esse).err != null){
    cr.message = (await esse).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await esse).result;
  cr.message = "Dados obtidos";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/selectCompanhiaAereaByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let esse = executeSelectByID('trecho', '49');

  if ((await esse).err != null){
    cr.message = (await esse).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await esse).result;
  cr.message = "Dados obtidos";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/deleteCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let esse = executeDeleteByID('trecho', '49');

  if ((await esse).err != null){
    cr.message = (await esse).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await esse).result;
  cr.message = "Dados obtidos";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.get("/updateCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  res.send(cr);
});

route.get("/insertCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
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
