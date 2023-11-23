import oracledb from 'oracledb';
import { DatabaseResponse } from 'src/model/databaseResponse';
import { oraConnAttribs } from "./config";

//atualiza um dado de companhia aerea no banco de dados
export const executeUpdateCompanhiaAerea = async (id: number, nomeCompanhiaAerea: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null };
    let connection;

    const updateString = `UPDATE COMPANHIA_AEREA
    SET NOME_COMPANHIA = '`+nomeCompanhiaAerea+`'
    WHERE ID_COMPANHIA_AEREA = ` + id;

    try {
        connection = await oracledb.getConnection(oraConnAttribs);

        console.log(updateString);

        const resUpdate = await connection.execute(updateString);

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
        }
    } catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        } else {
            resp.err = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    } finally {
        if (connection !== undefined) {
            await connection.close();
        }
        return resp;
    }
};

//atualiza um dado de metodo pagamento no banco de dados
export const executeUpdateMetodoPagamento = async (id: number, nomeMetodo: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null };
    let connection;

    const updateString = `UPDATE METODO_PAGAMENTO
    SET NOME_METODO = '`+nomeMetodo+`'
    WHERE ID_METODO_PAGAMENTO = ` + id;

    try {
        connection = await oracledb.getConnection(oraConnAttribs);

        console.log(updateString);

        const resUpdate = await connection.execute(updateString);

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
        }
    } catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        } else {
            resp.err = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    } finally {
        if (connection !== undefined) {
            await connection.close();
        }
        return resp;
    }
};
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
