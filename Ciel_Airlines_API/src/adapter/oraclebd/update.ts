import oracledb from 'oracledb';
import { DatabaseResponse } from 'src/model/databaseResponse';
import { oraConnAttribs } from "./config";

//insere um dado de companhia aerea no banco de dados
export const executeUpdateCompanhiaAerea = async(id: any, nomeCompanhiaAerea: string) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let insertString = `UPDATE COMPANHIA_AEREA SET NOME_COMPANHIA = `+nomeCompanhiaAerea+` WHERE ID_COMPANHIA_AEREA =` + id

        console.log(insertString)

        let resInsert = await connection.execute(insertString);

        await connection.commit();

        const rowsInserted = resInsert.rowsAffected
       
        if(rowsInserted !== undefined &&  rowsInserted === 1) {
            resp.result = rowsInserted
        } else {
            resp.err = 'Erro ao inserir dado na tabela'
        }
    }catch(e){
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
