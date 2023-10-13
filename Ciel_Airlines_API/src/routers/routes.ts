import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
//const AeronaveController = require('./Ciel_Airlines/src/controllers/AeronaveController.ts');
const TesteController = require('C:/Users/Cliente/Documents/GitHub/Ciel_Airlines/Ciel_Airlines_API/src/controllers/TesteController.ts');

export const router = express.Router();

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
  };

  router.get('/',(req:any, res:any) => {
    return res.json({mensagem: "Api atualizada"});
});
/*
//retorna todos as aeronaves
router.get('/get-aeronave', AeronaveController.getAeronave);

router.get('/teste',TesteController.get);

*/

router.get("/listarTeste", async(req:any, res:any)=>{

    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
      /*const connAttibs: ConnectionAttributes = {
        user: process.env.ORACLE_DB_USER,
        password: process.env.ORACLE_DB_SECRET,
        connectionString: process.env.ORACLE_DB_CONN_STRING,
      }
      const connection = await oracledb.getConnection(connAttibs);*/
        let resultadoConsulta = await connection.execute("SELECT * FROM TEST");
    
        await connection.close();
        cr.status = "SUCCESS"; 
        cr.message = "Dados obtidos";
        cr.payload = resultadoConsulta.rows;

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
  
