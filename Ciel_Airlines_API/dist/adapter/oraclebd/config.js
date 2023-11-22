"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oraConnAttribs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//atributos de conexao com o banco de dados
exports.oraConnAttribs = {
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_SECRET,
    connectString: process.env.ORACLE_DB_CONN_STR
};
