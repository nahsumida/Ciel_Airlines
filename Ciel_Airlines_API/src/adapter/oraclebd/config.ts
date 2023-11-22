import {ConnectionAttributes} from "oracledb";
import dotenv from "dotenv";

dotenv.config();

//atributos de conexao com o banco de dados
export const oraConnAttribs: ConnectionAttributes = {
    user : process.env.ORACLE_DB_USER, 
    password : process.env.ORACLE_DB_SECRET,
    connectString : process.env.ORACLE_DB_CONN_STR
}