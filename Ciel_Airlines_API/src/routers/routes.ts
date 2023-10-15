import express from "express";
import oracledb, { Connection, ConnectionAttributes } from "oracledb";
import dotenv from "dotenv";
//const AeronaveController = require('./Ciel_Airlines/src/controllers/AeronaveController.ts');
//const TesteController = require('C:/Users/Cliente/Documents/GitHub/Ciel_Airlines/Ciel_Airlines_API/src/controllers/TesteController.ts');

export const router = express.Router();

dotenv.config();

oracledb.createPool({
  user : process.env.ORACLE_DB_USER, 
  password : process.env.ORACLE_DB_SECRET,
  connectString : process.env.ORACLE_DB_CONN_STR,
  poolTimeout: 5000
});

type CustomResponse = {
    status: string,
    message: string,
    payload: any
  };

  router.get('/',(req:any, res:any) => {
    return res.json({mensagem: "Api atualizada"});
});
/*
//retorna todos as aeronaves
router.get('/get-aeronave', AeronaveController.getAeronave);

router.get('/teste',TesteController.get);

*/

router.get("/listarTeste", async(req:any, res:any)=>{

    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER, 
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM TEST");
    
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

router.delete("/excluirTeste", async(req:any, res:any)=>{

  const test_id = req.body.idtest as number;
 
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

    let resDelete = await connection.execute(`DELETE TEST WHERE TEST_ID = :1`, [test_id]);
    
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

router.post("/inserirTeste", async(req:any, res:any)=>{
  const idteste =  req.body.idteste as number;
  const nametest = req.body.nametest as string;

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

    const cmdInsert = `INSERT INTO TEST 
    (TEST_ID, TEST_NAME)
    VALUES (:1, :2)`

    const dados = [idteste,nametest]

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
      cr.message = e.message;'\s'
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