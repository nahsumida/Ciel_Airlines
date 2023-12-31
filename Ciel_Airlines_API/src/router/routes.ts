import express from "express";

import { executeSelectAll, executeSelectByID, executeSelectAssentoByVoo,
         executeSelectTrechoByID, executeSelectTrecho, executeSelectAeronave,
         executeSelectAeroporto, executeSelectAeroportoByID, 
         executeSelectAeronaveByID, executeSelectVoo, executeSelectVooByID, 
         searchTrecho, searchVoo, executeSelectVenda, executeSelectVendaByAssento } from '../adapter/oraclebd/select';
import { executeDeleteByID} from '../adapter/oraclebd/delete';
import { executeInsertCompanhiaAerea, executeInsertMetodoPagamento, 
         executeInsertCidade, executeInsertAeroporto, executeInsertTrecho, 
         executeInsertVenda, 
         executeInsertVoo,
         executeInsertAeronave} from "../adapter/oraclebd/insert";
import { executeUpdateCompanhiaAerea, executeUpdateMetodoPagamento, 
         executeUpdateCidade, executeUpdateAssento, executeUpdateTrecho,
         executeUpdateAeroporto, 
         executeUpdateAeronave,
         executeUpdateVoo} from "../adapter/oraclebd/update";

import { CustomResponse } from '../model/customResponse';

export const route = express.Router();

// SEARCH 
//pesquisa de voos de um trecho especifico filtrado por data
// dia x trecho y( trecho vem pelo req)
route.post("/searchVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const aeroSaida = req.body.aeroSaida as number;
  const aeroChegada = req.body.aeroChegada as number;
  const dataVoo  = req.body.dataVoo as string;

  console.log(aeroSaida, aeroChegada, dataVoo)

  let respTrecho = searchTrecho(aeroSaida, aeroChegada);

  if ((await respTrecho).err != null){
    cr.message = (await respTrecho).err;
    cr.status = "ERROR";
    res.send(cr);
  } else if ((await respTrecho).result === 0){
    cr.status = "ERROR";
    cr.message = "ZERO RESULTADOS";
    res.send(cr);
  } else {
    let respVoo = searchVoo((await respTrecho).result[0], dataVoo);

    if ((await respVoo).err != null){
      cr.message = (await respVoo).err;
      cr.status = "ERROR";
      res.send(cr);
    } 

    cr.payload = (await respVoo).result;
    cr.message = "Dado encontrado";
    cr.status = "SUCCESS"; 

    res.send(cr);
  }
});

// VENDA
route.get("/selectVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectVenda();

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

route.post("/selectVendaByAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAssento as number;
  console.log(id)
  let resp = executeSelectVendaByAssento(id);

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

route.delete("/deleteVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idVenda as number;

  // mudaro a funcao de venda para atualizar o assento do voo 
  let resp = executeDeleteByID('VENDA', id);

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

route.put("/insertVenda", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const nome = req.body.nome as string;
  const email = req.body.email as string;
  const idAssento = req.body.idAssento as number;
  const idVoo = req.body.idVoo as number;
  const pagamento = req.body.idMetodo as number;

  if (nome === undefined){
    cr.message = "valor invalido";
    cr.status = "ERROR";
    res.send(cr);
  }
  
  if (email === undefined){
    cr.message = "valor invalido";
    cr.status = "ERROR";
    res.send(cr);
  }

  let resp = executeInsertVenda(nome, email, idAssento, idVoo, pagamento);

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

// VOO
route.get("/selectVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectVoo();

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

route.get("/selectVooByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idVoo as number;
  console.log(id)
  let resp = executeSelectVooByID(id);

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

route.get("/deleteVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idVoo as number;

  let resp = executeDeleteByID('VOO', id);

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

route.post("/updateVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let id = req.body.idVoo as number;
  const data = req.body.dataVoo as string;
  const trecho = req.body.trecho as number;
  const horaPartida = req.body.horaPartida as string;
  const horaChegada = req.body.horaChegada as string;
  const preco = req.body.preco as number;
  const aeronave = req.body.aeronave as number;

  let resp = executeUpdateVoo(id, data, trecho, horaChegada, horaPartida, preco, aeronave);
  console.log(resp)
  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } else {
    cr.payload = (await resp).result;
    cr.message = "Dado inserido";
    cr.status = "SUCCESS"; 
    
  res.send(cr);
  }
});

route.put("/insertVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const trecho = req.body.trecho as number;
  const aeronave = req.body.aeronave as number;
  const dataVoo = req.body.dataVoo as string;
  const horaPartida = req.body.horaPartida as string;
  const horaChegada = req.body.horaChegada as string;
  const preco = req.body.preco as number;

  let resp = executeInsertVoo(trecho, aeronave, dataVoo, horaPartida, horaChegada, preco);

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

// AERNAVE
route.get("/selectAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectAeronave();

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

route.post("/selectAeronaveByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAeronave as number;
  console.log(id)
  let resp = executeSelectAeronaveByID(id);

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

route.post("/deleteAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAeronave as number;

  let resp = executeDeleteByID('AERONAVE', id);

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

route.post("/updateAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let id = req.body.idAeronave as number;
  const modelo = req.body.modelo as string;
  const numIdentificacao = req.body.numIdentificacao as string;
  const fabricante = req.body.fabricante as string;
  const anoFabricacao = req.body.anoFabricacao as number;
  const compahiaAerea = req.body.compahiaAerea as number;

  let resp = executeUpdateAeronave(id, modelo, numIdentificacao, fabricante, anoFabricacao, compahiaAerea);
  console.log(resp)
  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } else {
    cr.payload = (await resp).result;
    cr.message = "Dado inserido";
    cr.status = "SUCCESS"; 
    
  res.send(cr);
  }
});

route.put("/insertAeronave", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const modelo = req.body.modelo as string;
  const numIdentificacao = req.body.numIdentificacao as string;
  const fabricante = req.body.fabricante as string;
  const anoFabricacao = req.body.anoFabricacao as number;
  const compahiaAerea = req.body.compahiaAerea as number;
  const numAssento = req.body.numAssento as number;


  let resp = executeInsertAeronave(modelo, numIdentificacao, fabricante, anoFabricacao, compahiaAerea, numAssento);

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

// AEROPORTO
route.post("/selectAeroportoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAeroporto as number;
  console.log(id)
  let resp = executeSelectAeroportoByID(id);

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

route.get("/selectAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectAeroporto();

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

route.delete("/deleteAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAeroporto as number;

  let resp = executeDeleteByID('AEROPORTO', id);

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

route.post("/updateAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let id = req.body.idAeroporto as number;
  const idCidade = req.body.idCidade as number;
  const nomeAeroporto = req.body.nomeAeroporto as string;
  const sigla = req.body.sigla as string;

  let resp = executeUpdateAeroporto(id, idCidade, nomeAeroporto, sigla);
  console.log(resp)
  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } else {
    cr.payload = (await resp).result;
    cr.message = "Dado inserido";
    cr.status = "SUCCESS"; 
    
  res.send(cr);
  }
});

route.put("/insertAeroporto", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const idCidade = req.body.idCidade as number;
  const nomeAeroporto = req.body.nomeAeroporto as string;
  const sigla = req.body.sigla as string;

  if (nomeAeroporto === undefined){
    cr.message = "nome aeroporto invalido";
    cr.status = "ERROR";
    res.send(cr);
  }
  if (sigla === undefined){
    cr.message = "sigla invalida";
    cr.status = "ERROR";
    res.send(cr);
  }

  let resp = executeInsertAeroporto(idCidade, nomeAeroporto, sigla);

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

// ASSENTO
route.post("/selectAssentoByVoo", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const idVoo = req.body.idVoo as number;

  let resp = executeSelectAssentoByVoo('ASSENTO', idVoo);

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

route.post("/selectAssentoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idAssento as number;

  let resp = executeSelectByID('ASSENTO', id);

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

route.post("/updateAssento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idAssento as number;
  const status = req.body.status as string;

  if (status === 'undefined'){
    cr.message = "valor invalido";
    cr.status = "ERROR";
    res.send(cr);
  }

  let resp = executeUpdateAssento(id,status);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado alterado";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

// CIDADE 
route.get("/selectCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectAll('CIDADE');

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

route.post("/selectCidadeByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idCidade as number;

  let resp = executeSelectByID('CIDADE', id);

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

route.delete("/deleteCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idCidade as number;
  console.log(id)
  let resp = executeDeleteByID('CIDADE', id);

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

route.post("/updateCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idCidade as number;
  const nomeCompanhia = req.body.nomeCidade as string;

  let resp = executeUpdateCidade(id,nomeCompanhia);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado alterado";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.put("/insertCidade", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const nomeCidade = req.body.nomeCidade as string;

  if (nomeCidade === undefined){
    cr.message = "valor invalido";
    cr.status = "ERROR";
    res.send(cr);
  }

  let resp = executeInsertCidade(nomeCidade);

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

// COMPANHIA AEREA ////////
route.get("/selectCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectAll('Companhia_aerea');

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

route.post("/selectCompanhiaAereaByID", async(req:any, res:any)=>{
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

route.post("/deleteCompanhiaAerea", async(req:any, res:any)=>{
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

route.post("/updateCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idCompanhiaAerea as number;
  const nomeCompanhia = req.body.nomeCompanhiaAerea as string;

  let resp = executeUpdateCompanhiaAerea(id,nomeCompanhia);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado alterado";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.put("/insertCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const nomeCompanhia = req.body.nomeCompanhiaAerea as string;

  if (nomeCompanhia === undefined){
    cr.message = "valor invalido";
    cr.status = "ERROR";
    res.send(cr);
  }

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

  let resp = executeSelectAll('METODO_PAGAMENTO');

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

route.post("/selectMetodoPagamentoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idMetodoPagamento as number;

  let resp = executeSelectByID('METODO_PAGAMENTO', id);

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

route.delete("/deleteMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idMetodoPagamento as number;

  let resp = executeDeleteByID('METODO_PAGAMENTO', id);

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

route.post("/updateMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idMetodoPagamento as number;
  const nomeMetodo = req.body.nomeMetodoPagamento as string;

  let resp = executeUpdateMetodoPagamento(id,nomeMetodo);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado alterado";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.put("/insertMetodoPagamento", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idMetodoPagamento as number;
  const nomeMetodo = req.body.nomeMetodoPagamento as string;

  let resp = executeInsertMetodoPagamento(nomeMetodo);

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

// TRECHO
route.get("/selectTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let resp = executeSelectTrecho();

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

route.post("/selectTrechoByID", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idTrecho as number;

  let resp = executeSelectTrechoByID(id);

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

route.delete("/deleteTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  const id = req.body.idTrecho as number;

  let resp = executeDeleteByID('TRECHO', id);

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

route.post("/updateTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const id = req.body.idTrecho as number;
  const aeroSaida = req.body.aeroSaida as number;
  const aeroChegada = req.body.aeroChegada as number;


  let resp = executeUpdateTrecho(id,aeroSaida, aeroChegada);

  if ((await resp).err != null){
    cr.message = (await resp).err;
    cr.status = "ERROR";
    res.send(cr);
  } 

  cr.payload = (await resp).result;
  cr.message = "Dado alterado";
  cr.status = "SUCCESS"; 
  
  res.send(cr);
});

route.put("/insertTrecho", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};
  
  const aeroSaida = req.body.aeroSaida as number;
  const aeroChegada = req.body.aeroChegada as string;

  let resp = executeInsertTrecho(aeroSaida, aeroChegada);

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
