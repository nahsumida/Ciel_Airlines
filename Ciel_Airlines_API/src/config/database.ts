/*import oracledb, { Connection, ConnectionAttributes } from 'oracledb';
import dotenv from 'dotenv';


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
  };


  async function executeDBQuery(dbquery: string, action: string) {
     
        let cr: CustomResponse = {
            status: "ERROR",
            message: "",
            payload: undefined,
        };

        let conn;

        try {
            conn = await oracledb.getConnection({
                user : process.env.ORACLE_DB_USER, 
                password : process.env.ORACLE_DB_SECRET,
                connectString : process.env.ORACLE_DB_CONN_STR
            });

            const result = await conn.execute(dbquery);

            switch(action){
                case "get":{
                    cr.status = "SUCCESS"; 
                    cr.message = "Dados obtidos";
                    cr.payload = result.rows;

                    return cr;
                }  
                case "create":{
                    await conn.commit();

                    const rowsInserted = result.rowsAffected

                    if(rowsInserted !== undefined &&  rowsInserted === 1) {
                        cr.status = "SUCCESS"; 
                        cr.message = "Dado inserido.";

                        return cr;
                    }
                }
                case "delete":{
                    await conn.commit();

                    const rowsDeleted = result.rowsAffected
                    if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
                        cr.status = "SUCCESS"; 
                        cr.message = "Aeronave excluída.";
                    }else{
                        cr.message = "Dado não excluído. Verifique se a informação está correta.";
                    }

                    return cr;
            }
                case "update":{
                    await conn.commit();

                    const rowsUpdated = result.rowsAffected

                    if(rowsUpdated !== undefined &&  rowsUpdated === 1) {
                        cr.status = "SUCCESS"; 
                        cr.message = "Dado atualizado.";
                    }else{
                        cr.message = "Dado não atualizado. Verifique se a informação está correta.";
                    }

                    return cr;
            }   
            }

        } catch(e){
            if(e instanceof Error){
              cr.message = e.message;
              console.log(e.message);
            }else{
              cr.message = "Erro ao conectar ao oracle. Sem detalhes";
              return cr;
            }
        } finally {
            if(conn!== undefined){
              await conn.close();
            }
           // res.send(cr);  
        }
    };

module.exports = { executeDBQuery }
*/