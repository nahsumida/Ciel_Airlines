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
      
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_VOO = ` + idVoo + ` order by ID_Assento`
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
SAIDA.SIGLA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA,
CHEGADA.SIGLA
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
                                A.NUM_IDENTIFICACAO,
                                A.NUMASSENTOS
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
                                A.NUM_IDENTIFICACAO,
                                A.NUMASSENTOS
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
                                A.NOME_AEROPORTO,
                                A.id_CIDADE,
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

//seleciona todos os dados de um aeroporto especifico  
export const executeSelectVooByID = async(id: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        chegada.NOME_AEROPORTO,
        saida.NOME_AEROPORTO
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada
    where 
        v.id_voo = `+ id

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
export const executeSelectVoo = async() => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        saida.SIGLA,
    chegada.SIGLA
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada`
        
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
export const searchVoo = async(idTrecho: number, dataVoo: string) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        chegada.NOME_AEROPORTO,
        saida.NOME_AEROPORTO
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada
    where v.data = TO_DATE('` + dataVoo  + `', 'yyyy-mm-dd') and v.TRECHO =`+ idTrecho

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
export const searchTrecho = async(aeroSaida: number, aeroChegada: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);
      
        let selectString = `select id_trecho from trecho where AERO_SAIDA = `+aeroSaida + ` and aero_chegada = `+ aeroChegada

        console.log(selectString);
        let resSelect = await connection.execute(selectString);

        await connection.close();

        if ((resSelect.rows)?.length != undefined && (resSelect.rows)?.length < 1){
            resp.result = 0;
        }else{
            resp.result = resSelect.rows;
        }
        
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

//seleciona todas as linhas da tabela 
export const executeSelectVenda = async() => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let selectString = `SELECT
        v.ID_VENDA,
        v.NOME_PASSAGEIRO,
        v.EMAIL_PASSAGEIRO,
        A.CODIGO,
        M.NOME_METODO,
        ve.HORA_PARTIDA,
        ve.HORA_CHEGADA,
        ve.DATA,
        saida.NOME_AEROPORTO,
        chegada.NOME_AEROPORTO
    FROM
        VENDA V
    JOIN
        ASSENTO A ON A.ID_ASSENTO = V.ASSENTO
    Join
        METODO_PAGAMENTO M ON M.ID_METODO_PAGAMENTO = V.PAGAMENTO
    join
        voo ve on ve.ID_VOO = v.ID_VOO
    JOIN
        trecho T on t.ID_TRECHO = ve.TRECHO
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_SAIDA
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_CHEGADA`
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