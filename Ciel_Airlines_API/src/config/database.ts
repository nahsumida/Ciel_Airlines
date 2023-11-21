import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

let result: any, err: any;

//executa a query de select enviada como parametro na chamada da funcao 
export const executeSelectAll = async(table:String) => {
    result = null, err = null;

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM :1 ", [table]);
    
        await connection.close();
        result = resSelect.rows;
    }catch(e){
        if(e instanceof Error){
            err = e.message;
            console.log(e.message);
        }else{
            err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        return {result, err};  
    }
}


//executa a query de select enviada como parametro na chamada da funcao 
export const executeSelectByID = async(query:any) => {
    result = null, err = null;

    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute(query);
    
        await connection.close();
        result = resSelect.rows;
    }catch(e){
        if(e instanceof Error){
            err = e.message;
            console.log(e.message);
        }else{
            err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        return [result, err];  
    }
}
