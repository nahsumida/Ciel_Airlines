import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";

export const mapaAssentoRouter = express.Router();

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
};

mapaAssentoRouter.get("/listarMapaAssento", async(req:any, res:any)=>{
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM MAPA_ASSENTO");
    
        await connection.close();
        cr.status = "SUCCESS"; 
        cr.message = "Dados obtidos";
        cr.payload = resSelect.rows;
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
  
mapaAssentoRouter.delete("/excluirMapaAssento", async(req:any, res:any)=>{

    const idMapa = req.body.idMapa as number;
   
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
  
      let resDelete = await connection.execute(`DELETE MAPA_ASSENTO WHERE ID_MAPA = :1`, [idMapa]);
      
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

mapaAssentoRouter.post("/inserirMapaAssento", async(req:any, res:any)=>{

    const numDeFileira = req.body.numDeFileira as number;
    const numPorFileira = req.body.numPorFileira as number;

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

        const cmdInsert = `INSERT INTO MAPA_ASSENTO 
        (ID_MAPA, NUM_DE_FILEIRA, NUM_POR_FILEIRA)
        VALUES (ID_MAPA_SEQ.NEXTVAL, :1, :2)`

        const dados = [numDeFileira, numPorFileira]

        let resInsert = await connection.execute(cmdInsert, dados);

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