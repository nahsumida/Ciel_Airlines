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

// insere um dado de cidade no banco de dados 
export const executeInsertCidade = async(nomeCidade: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let insertString = `INSERT INTO CIDADE
        (ID_CIDADE, NOME_CIDADE)
        VALUES (ID_CIDADE_SEQ.NEXTVAL, '` + nomeCidade + `')` 
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

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeInsertTrecho = async(saida:any, chegada:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `INSERT INTO TRECHO 
        (ID_TRECHO, AERO_SAIDA, AERO_CHEGADA)
        VALUES (ID_TRECHO_SEQ.NEXTVAL,` + saida +`,`+chegada+`)`
      
        let resInsert = await connection.execute(updateString);

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
        return resp;  
    }
}

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeInsertAeroporto = async(idCidade: number, nomeAeroporto: any, sigla: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `INSERT INTO AEROPORTO 
        (ID_AEROPORTO, ID_CIDADE, NOME_AEROPORTO, SIGLA)
        VALUES (ID_AEROPORTO_SEQ.NEXTVAL, `+idCidade+`,'`+nomeAeroporto+`','`+sigla+`')`
      
        let resInsert = await connection.execute(updateString);

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
        return resp;  
    }
}

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeInsertVenda = async(nome: any, email: any, idAssento: number, idVoo: number, pagamento: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let insertString = `insert into venda (id_venda, nome_passageiro, EMAIL_PASSAGEIRO, ASSENTO, id_voo, pagamento) values (ID_VENDA_SEQ.nextval, '` + nome + `', '`+email+`', ` + idAssento + `,` + idVoo + `,` +  pagamento +`)`
        
      
        let resInsert = await connection.execute(insertString);

        await connection.commit();

        let updateString = `update ASSENTO set status='INDISPONIVEL' WHERE ID_ASSENTO=` + idAssento

        await connection.execute(updateString);

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
        return resp;  
    }
}

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeInsertVoo = async(trecho: number, aeronave: number, dataVoo: string, hora_partida: string, hora_chegada: string, preco: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `insert into voo 
        (ID_VOO, TRECHO, AERONAVE, DATA, HORA_PARTIDA, HORA_CHEGADA, PRECO) 
        VALUES (id_voo_seq.nextval, ` + trecho + `,` +  aeronave + `, TO_DATE('` + dataVoo  + `', 'yyyy-mm-dd'), '` + hora_partida + `', '` + hora_chegada + `', ` + preco + `)`
      
        let resInsert = await connection.execute(updateString);

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
        return resp;  
    }
}

//atualiza a o aeroporto de ida e de volta de um trecho
export const executeInsertAeronave = async(modelo: string, identificacao: any, fabricante: any, anoFabricacao: number, compahiaAerea: number, numAssento: number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `INSERT INTO AERONAVE 
        (ID_AERONAVE, MODELO, NUM_IDENTIFICACAO, FABRICANTE, ANO_FABRICACAO, COMPANHIA_AEREA, NUMASSENTOS) 
        VALUES (ID_AERONAVE_SEQ.nextval, '` + modelo + `', '` + identificacao + `', '` + fabricante + `', ` + anoFabricacao + `,`  + compahiaAerea + `, ` + numAssento + `)`
      
        let resInsert = await connection.execute(updateString);

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
        return resp;  
    }
}