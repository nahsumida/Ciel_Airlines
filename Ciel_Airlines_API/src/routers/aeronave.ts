import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";

export const aeronaveRouter = express.Router();

dotenv.config();

type CustomResponse = {
    status: string,
    message: string,
    payload: any
};

aeronaveRouter.get("/listarAeronave", async(req:any, res:any)=>{
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM AERONAVE");
    
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

aeronaveRouter.delete("/excluirAeronave", async(req:any, res:any)=>{

    const idAeronave = req.body.idAeronave as number;
   
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
  
      let resDelete = await connection.execute(`DELETE AERONAVE WHERE ID_AERONAVE = :1`, [idAeronave]);
      
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
  
aeronaveRouter.post("/inserirAeronave", async(req:any, res:any)=>{
    
    const numIdentificacao =  req.body.modelo as string;
    const modelo = req.body.modelo as string;
    const fabricante = req.body.fabricante as string;
    const anoFabricacao = req.body.anoFabricacao as number;
    const companhiaAerea = req.body.companhiaAerea as number;
    const mapaAssento =  req.body.mapaAssento as number;
    const totalAssento = req.body.totalAssento as number;
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
  
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
  
      const cmdInsert = `INSERT INTO AERONAVE 
      (NUM_IDENTIFICACAO, MODELO, FABRICANTE, ANO_FABRICACAO, COMPANHIA_AEREA, MAPA_ASSENTO, TOTAL_ASSENTO)
      VALUES (:1, :2, :3, :4, :5, :6)`

      const dados = [numIdentificacao, modelo, fabricante, anoFabricacao, companhiaAerea, mapaAssento, totalAssento]
  
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
