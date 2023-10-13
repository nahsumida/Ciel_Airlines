import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";

export const aeronaveRouter = express.Router();

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
};

aeronaveRouter.get("/listarAeronave", async(req:any, res:any)=>{
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resultadoConsulta = await connection.execute("SELECT * FROM AERONAVE");
    
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
  
