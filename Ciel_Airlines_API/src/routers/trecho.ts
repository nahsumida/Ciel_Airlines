import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";

export const trechoRouter = express.Router();

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
};

trechoRouter.get("/listarTrecho", async(req:any, res:any)=>{
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resultadoConsulta = await connection.execute("SELECT * FROM TRECHO");
    
        await connection.close();
        cr.status = "SUCCESS"; 
        cr.message = "Dados obtidos";
        cr.payload = resultadoConsulta.rows;
    }catch(e){
        if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
        }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        res.send(cr);  
    }
});
  
  
trechoRouter.delete("/excluirTrecho", async(req:any, res:any)=>{

    const idTrecho = req.body.idTrecho as number;
   
    let cr: CustomResponse = {
      status: "ERROR",
      message: "",
      payload: undefined,
    };
  
    try{
      const connection = await oracledb.getConnection({
        user : process.env.ORACLE_DB_USER, 
        password : process.env.ORACLE_DB_SECRET,
        connectString : process.env.ORACLE_DB_CONN_STR
      });
  
      let resDelete = await connection.execute(`DELETE TRECHO WHERE IDTRECHO = :1`, [idTrecho]);
      
      await connection.commit();
  
      await connection.close();
      
      const rowsDeleted = resDelete.rowsAffected
      if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
        cr.status = "SUCCESS"; 
        cr.message = "Dado excluído.";
      }else{
        cr.message = "Dado não excluído. Verifique se o id informado está correto.";
      }
  
    }catch(e){
      if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
      }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      res.send(cr);  
    }
});

trechoRouter.post("/incluirTrecho", async(req:any, res:any)=>{

    const cidadeSaida = req.body.cidadeSaida as string;
    const cidadeChegada = req.body.cidadeChegada as string;

    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)

    // definindo um objeto de resposta.
    let cr: CustomResponse = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };

    let connection; 

    try{
        connection = await oracledb.getConnection({
        user : process.env.ORACLE_DB_USER, 
        password : process.env.ORACLE_DB_SECRET,
        connectString : process.env.ORACLE_DB_CONN_STR
        });

        const cmdInsertAeroporto = `INSERT INTO TRECHO 
        (IDTRECHO, CIDADESAIDA, CIDADECHEGADA)
        VALUES (ID_TRECHO_SEQ.NEXTVAL, :1, :2)`

        const dados = [cidadeSaida, cidadeChegada]

        let resInsert = await connection.execute(cmdInsertAeroporto, dados);

        await connection.commit();

        const rowsInserted = resInsert.rowsAffected
        console.log(rowsInserted)
        if(rowsInserted !== undefined &&  rowsInserted === 1) {
        cr.status = "SUCCESS"; 
        cr.message = "Dado inserido.";
        }

    }catch(e){
        if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
        }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        if (connection) {
        try {
            await connection.close({drop: true});
        } catch (err) {
            console.error(err);
        }
        }
        res.send(cr);  
    }
});
