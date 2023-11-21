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
exports.executeSelectByID = exports.executeSelectAll = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let result, err;
//executa a query de select enviada como parametro na chamada da funcao 
const executeSelectAll = (table) => __awaiter(void 0, void 0, void 0, function* () {
    result = null, err = null;
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resSelect = yield connection.execute("SELECT * FROM :1 ", [table]);
        yield connection.close();
        result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            err = e.message;
            console.log(e.message);
        }
        else {
            err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return { result, err };
    }
});
exports.executeSelectAll = executeSelectAll;
//executa a query de select enviada como parametro na chamada da funcao 
const executeSelectByID = (query) => __awaiter(void 0, void 0, void 0, function* () {
    result = null, err = null;
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resSelect = yield connection.execute(query);
        yield connection.close();
        result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            err = e.message;
            console.log(e.message);
        }
        else {
            err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return [result, err];
    }
});
exports.executeSelectByID = executeSelectByID;
