import oracledb from 'oracledb';
import dotenv from 'dotenv';
import { DatabaseResponse } from '../model/databaseResponse';

dotenv.config();

//seleciona todas as linhas da tabela 
export const executeSelectAll = async(table:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let selectString = 'SELECT * FROM ' + table;
     
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

//seleciona todos os dados de um id especifico  
export const executeSelectByID = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
      
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

//deleta todos os dados de um id especifico
export const executeDeleteByID = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let deleteString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      
        let resSelect = await connection.execute(deleteString);

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

//atualiza os dados de uma cidade de id especifico
export const executeUpdateCidade = async(id:any, nomeCidade: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let updateString = `Update cidade set nome_cidade = ` + nomeCidade + ` where id_cidade = ` + id
      
        let resSelect = await connection.execute(updateString);

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

//atualiza os dados de uma companhia aerea de id especifico
export const executeUpdateCompanhiaAerea = async(id:any, nomeCompanhia:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let updateString = `Update companhia_aerea set nome_companhia = ` + nomeCompanhia + ` where id_companhia_aerea = ` + id
      
        let resSelect = await connection.execute(updateString);

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

//atualiza o status de um assento do mapa
export const executeUpdateMapaAssento = async(id:any, status:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let updateString = `Update mapa_assento set status = '` + status + `' where id_mapa_assento = ` + id
      
        let resSelect = await connection.execute(updateString);

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

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeUpdateTrecho = async(id:any, saida:any, chegada:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let updateString = `Update trecho set aero_saida = ` + saida + `, aero_chegada = ` + chegada + ` where id_trecho = ` + id
      
        let resSelect = await connection.execute(updateString);

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

///////////////////
export const executeUpdateAeronave = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let updateString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      
        let resSelect = await connection.execute(updateString);

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

export const executeUpdateAeroporto = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let deleteString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      
        let resSelect = await connection.execute(deleteString);

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


export const executeUpdateVoo = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let deleteString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      
        let resSelect = await connection.execute(deleteString);

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

export const executeUpdateVenda = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });

        let deleteString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      
        let resSelect = await connection.execute(deleteString);

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
