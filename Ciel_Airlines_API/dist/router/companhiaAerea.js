"use strict";
/*import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
import { executeSelectAll, executeSelectByID, executeDeleteByID, executeUpdateCompanhiaAerea} from '../config/database';
import { CustomResponse } from '../model/customResponse';
export const companhiaAereaRouter = express.Router();

dotenv.config();

companhiaAereaRouter.get("/selectCompanhiaAerea", async(req:any, res:any)=>{
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

companhiaAereaRouter.get("/selectCompanhiaAereaByID", async(req:any, res:any)=>{
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

companhiaAereaRouter.get("/deleteCompanhiaAerea", async(req:any, res:any)=>{
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

companhiaAereaRouter.get("/listarCompanhiaAerea", async(req:any, res:any)=>{
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER,
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM COMPANHIA_AEREA");
    
        await connection.close();
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = resSelect.rows;
    }catch(e){
        if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
        }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        res.send(cr);
    }
});
  
companhiaAereaRouter.delete("/excluirCompanhiaAerea", async(req:any, res:any)=>{

    const idCompanhiaAerea = req.body.idCompanhiaAerea as number;
   
    let cr: CustomResponse = {
      status: "ERROR",
      message: "",
      payload: undefined,
    };
  
    try{
      const connection = await oracledb.getConnection({
        user : process.env.ORACLE_DB_USER,
        password : process.env.ORACLE_DB_SECRET,
        connectString : process.env.ORACLE_DB_CONN_STR
      });
  
      let resDelete = await connection.execute(`DELETE COMPANHIA_AEREA WHERE ID_COMPANHIA = :1`, [idCompanhiaAerea]);
      
      await connection.commit();
  
      await connection.close();
      
      const rowsDeleted = resDelete.rowsAffected
      if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
        cr.status = "SUCCESS";
        cr.message = "Dado excluído.";
      }else{
        cr.message = "Dado não excluído. Verifique se o id informado está correto.";
      }
  
    }catch(e){
      if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
      }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      res.send(cr);
    }
});

companhiaAereaRouter.post("/inserirCompanhiaAerea", async(req:any, res:any)=>{

const nomeCompanhiaAerea = req.body.nomeCompanhiaAerea as string;

// correção: verificar se tudo chegou para prosseguir com o cadastro.
// verificar se chegaram os parametros
// VALIDAR se estão bons (de acordo com os critérios - exemplo:
// não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)

// definindo um objeto de resposta.
let cr: CustomResponse = {
    status: "ERROR",
    message: "",
    payload: undefined,
};

let connection;

try{
    connection = await oracledb.getConnection({
    user : process.env.ORACLE_DB_USER,
    password : process.env.ORACLE_DB_SECRET,
    connectString : process.env.ORACLE_DB_CONN_STR
    });

    const cmdInsert = `INSERT INTO COMPANHIA_AEREA
    (ID_COMPANHIA, NOME_COMPANHIA)
    VALUES (ID_COMPANHIA_SEQ.NEXTVAL, :1)`

    const dados = [nomeCompanhiaAerea]

    let resInsert = await connection.execute(cmdInsert, dados);

    await connection.commit();

    const rowsInserted = resInsert.rowsAffected
    console.log(rowsInserted)
    if(rowsInserted !== undefined &&  rowsInserted === 1) {
    cr.status = "SUCCESS";
    cr.message = "Dado inserido.";
    }

}catch(e){
    if(e instanceof Error){
    cr.message = e.message;
    console.log(e.message);
    }else{
    cr.message = "Erro ao conectar ao oracle. Sem detalhes";
    }
} finally {
    if (connection) {
    try {
        await connection.close({drop: true});
    } catch (err) {
        console.error(err);
    }
    }
    res.send(cr);
}
});
*/ 
