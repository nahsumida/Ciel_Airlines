import oracledb from 'oracledb';
import { DatabaseResponse } from 'src/model/databaseResponse';
import { oraConnAttribs } from "./config";

//insere um dado de companhia aerea no banco de dados
export const executeInsertCompanhiaAerea = async(nomeCompanhiaAerea: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let insertString = `INSERT INTO COMPANHIA_AEREA 
        (ID_COMPANHIA_AEREA, NOME_COMPANHIA)
        VALUES (ID_COMPANHIA_SEQ.NEXTVAL, '` + nomeCompanhiaAerea + `')` 
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
//insere um dado de companhia aerea no banco de dados
export const executeInsertMetodoPagamento = async(nomeMetodo: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let insertString = `INSERT INTO METODO_PAGAMENTO 
        (ID_METODO_PAGAMENTO, NOME_METODO)
        VALUES (ID_METODO_SEQ.NEXTVAL, '` + nomeMetodo + `')` 
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


//atualiza o status de um assento do mapa
export const executeInsertMapaAssento = async(id:any, status:any) => {
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
export const executeInsertTrecho = async(id:any, saida:any, chegada:any) => {
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
export const executeInsertAeronave = async(table:string, id:any) => {
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

export const executeInsertAeroporto = async(table:string, id:any) => {
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


export const executeInsertVoo = async(table:string, id:any) => {
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

export const executeInsertVenda = async(table:string, id:any) => {
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
