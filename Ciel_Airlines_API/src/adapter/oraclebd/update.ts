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
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `Update cidade set nome_cidade = '` + nomeCidade + `' where id_cidade = ` + id
        console.log(updateString)
        let resUpdate = await connection.execute(updateString);

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
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

//atualiza os dados de um assento de id especifico
export const executeUpdateAssento = async(id:any, status: any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `Update assento set status = '` + status + `' where id_assento = ` + id
        console.log(updateString)
        let resUpdate = await connection.execute(updateString);

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
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

//atualiza os dados de um assento de id especifico
export const executeUpdateTrecho = async(id:number,aeroSaida:number, aeroChegada:number) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `Update trecho set aero_saida = ` + aeroSaida + `, aero_chegada = ` + aeroChegada + ` where id_trecho = ` + id
        console.log(updateString)
        let resUpdate = await connection.execute(updateString);

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
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

//atualiza os dados de um assento de id especifico
export const executeUpdateAeroporto = async(id:number, idCidade: number, nomeAeroporto:any, sigla:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;

    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let updateString = `update AEROPORTO set id_cidade=` + idCidade +` ,nome_aeroporto='` + nomeAeroporto + `', sigla='` + sigla + `' where ID_AEROPORTO = ` + id

        console.log(updateString)
        let resUpdate = await connection.execute(updateString);
        
        console.log(resUpdate)

        await connection.commit();

        const rowsAffected = resUpdate.rowsAffected;

        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        } else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
