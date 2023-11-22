import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
import { executeSelectAll, executeSelectByID, executeDeleteByID, executeUpdateCompanhiaAerea} from '../config/database';
import { CustomResponse } from '../model/customResponse';
export const route = express.Router();

dotenv.config();

// COMPANHIA AEREA
route.get("/selectCompanhiaAerea", async(req:any, res:any)=>{
  let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined};

  let esse = executeSelectAll('aeronave');

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
