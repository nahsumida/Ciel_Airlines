"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeDBQuery = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv_1 = __importDefault(require("dotenv"));
const funcao = () => ":onda:";
const funcaoAsync = () => __awaiter(void 0, void 0, void 0, function* () { return ":onda:"; });
const minhaString = funcao();
const minhaPromiseString = funcaoAsync();
dotenv_1.default.config();
const executeDBQuery = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resSelect = yield connection.execute(req);
        yield connection.close();
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return (cr);
    }
});
exports.executeDBQuery = executeDBQuery;
/*
export async function executeDBQuery(dbquery:string) {
    let cr: CustomResponse = {status: "ERROR", message: "", payload: undefined,};
  
    try{
        const connection = await oracledb.getConnection({
            user : process.env.ORACLE_DB_USER,
            password : process.env.ORACLE_DB_SECRET,
            connectString : process.env.ORACLE_DB_CONN_STR
        });
     
        let resSelect = await connection.execute("SELECT * FROM CIDADE");
    
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
}*/
/*
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
