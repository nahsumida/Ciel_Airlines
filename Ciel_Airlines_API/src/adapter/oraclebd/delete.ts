import oracledb from 'oracledb';
import { DatabaseResponse } from 'src/model/databaseResponse';
import { oraConnAttribs } from "./config";

//deleta todos os dados de um id especifico
export const executeDeleteByID = async(table:string, id:any) => {
    let resp: DatabaseResponse = { result: undefined, err: null};
    let connection;
console.log("cheguei aqui")
    try{
        connection = await oracledb.getConnection(oraConnAttribs);

        let deleteString = `DELETE ` +  table + ` WHERE ID_` + table + ` = ` + id
      console.log(deleteString)
        let resDelete = await connection.execute(deleteString);
        
        await connection.commit();

        await connection.close();

        const rowsDeleted = resDelete.rowsAffected
        if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
            resp.result = rowsDeleted;
        }else{
            resp.err = "Dado não excluído. Verifique se o id informado está correto.";
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
