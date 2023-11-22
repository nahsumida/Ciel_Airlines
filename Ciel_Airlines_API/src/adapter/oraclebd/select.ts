import oracledb from 'oracledb';
import { DatabaseResponse } from 'src/model/databaseResponse';
import { oraConnAttribs } from "./config";

//seleciona todas as linhas da tabela 
export const executeSelectAll = async(table:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let selectString = 'SELECT * FROM ' + table;
     
        let resSelect = await connection.execute(selectString);

        resp.result = resSelect.rows;
    } catch(e){
        if(e instanceof Error){
            resp.err = e.message;
            console.log(e.message);
        }else{
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        if(connection !== undefined){
            await connection.close();
        }
      
        return resp;  
    }
}

//seleciona todos os dados de um id especifico  
export const executeSelectByID = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_` + table + ` = ` + id 

        let resSelect = await connection.execute(selectString);

        await connection.close();
        resp.result = resSelect.rows;
    }catch(e){
        if(e instanceof Error){
            resp.err = e.message;
            console.log(e.message);
        }else{
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        return resp;  
    }
}
