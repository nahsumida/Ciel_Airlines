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
        console.log(selectString);
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
        console.log(selectString);
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

//seleciona todos assentos de um voo especifico
export const executeSelectAssentoByVoo = async(table:string, idVoo:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_VOO = ` + idVoo 
        console.log(selectString);
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

//seleciona todos os dados de um trecho especifico  
export const executeSelectTrecho = async() => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                T.ID_TRECHO,
                                T.AERO_SAIDA,
                                T.AERO_CHEGADA,
                                SAIDA.NOME_AEROPORTO AS AEROPORTO_SAIDA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA
                            FROM
                                TRECHO T
                            JOIN
                                AEROPORTO SAIDA ON T.AERO_SAIDA = SAIDA.ID_AEROPORTO
                            JOIN
                                AEROPORTO CHEGADA ON T.AERO_CHEGADA = CHEGADA.ID_AEROPORTO`
        console.log(selectString);
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

//seleciona todos os dados de um trecho especifico  
export const executeSelectTrechoByID = async(id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                T.ID_TRECHO,
                                T.AERO_SAIDA,
                                T.AERO_CHEGADA,
                                SAIDA.NOME_AEROPORTO AS AEROPORTO_SAIDA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA
                            FROM
                                TRECHO T
                            JOIN
                                AEROPORTO SAIDA ON T.AERO_SAIDA = SAIDA.ID_AEROPORTO
                            JOIN
                                AEROPORTO CHEGADA ON T.AERO_CHEGADA = CHEGADA.ID_AEROPORTO
                            WHERE T.ID_TRECHO = ` + id 
        console.log(selectString);
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

//seleciona todos os dados de um aeronave especifico  
export const executeSelectAeronave = async() => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                A.ID_AERONAVE,
                                C.NOME_COMPANHIA,
                                A.MODELO,
                                A.ANO_FABRICACAO,
                                A.FABRICANTE,
                                A.NUM_IDENTIFICACAO
                            FROM
                                AERONAVE A
                            JOIN
                                COMPANHIA_AEREA C ON C.ID_COMPANHIA_AEREA = A.COMPANHIA_AEREA`
        console.log(selectString);
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
export const executeSelectAeronaveByID = async(id:number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                A.ID_AERONAVE,
                                C.NOME_COMPANHIA,
                                A.MODELO,
                                A.ANO_FABRICACAO,
                                A.FABRICANTE,
                                A.NUM_IDENTIFICACAO
                            FROM
                                AERONAVE A
                            JOIN
                                COMPANHIA_AEREA C ON C.ID_COMPANHIA_AEREA = A.COMPANHIA_AEREA
                            WHERE A.ID_AERONAVE = ` + id
        console.log(selectString);
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

//seleciona todos os dados de um aeroporto especifico  
export const executeSelectAeroporto = async() => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                A.ID_AEROPORTO,
                                i.NOME_CIDADE,
                                A.Sigla
                            FROM
                                AEROPORTO A
                            JOIN
                                CIDADE I ON I.ID_CIDADE = A.ID_CIDADE`
        console.log(selectString);
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

//seleciona todos os dados de um aeroporto especifico  
export const executeSelectAeroportoByID = async(id: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
                                A.ID_AEROPORTO,
                                A.NOME_AEROPORTO,   
                                i.NOME_CIDADE,
                                A.Sigla
                            FROM
                                AEROPORTO A
                            JOIN
                                CIDADE I ON I.ID_CIDADE = A.ID_CIDADE
                            WHERE A.ID_AEROPORTO = `+ id
        console.log(selectString);
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