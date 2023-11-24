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
exports.executeSelectTrechoByID = exports.executeSelectTrecho = exports.executeSelectAssentoByVoo = exports.executeSelectByID = exports.executeSelectAll = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = require("./config");
//seleciona todas as linhas da tabela 
const executeSelectAll = (table) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = 'SELECT * FROM ' + table;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        resp.result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        return resp;
    }
});
exports.executeSelectAll = executeSelectAll;
//seleciona todos os dados de um id especifico  
const executeSelectByID = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_` + table + ` = ` + id;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        yield connection.close();
        resp.result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return resp;
    }
});
exports.executeSelectByID = executeSelectByID;
//seleciona todos assentos de um voo especifico
const executeSelectAssentoByVoo = (table, idVoo) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_VOO = ` + idVoo;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        yield connection.close();
        resp.result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return resp;
    }
});
exports.executeSelectAssentoByVoo = executeSelectAssentoByVoo;
//seleciona todos os dados de um trecho especifico  
const executeSelectTrecho = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                T.ID_TRECHO,
                                T.AERO_SAIDA,
                                T.AERO_CHEGADA,
                                SAIDA.NOME_AEROPORTO AS AEROPORTO_SAIDA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA
                            FROM
                                TRECHO T
                            JOIN
                                AEROPORTO SAIDA ON T.AERO_SAIDA = SAIDA.ID_AEROPORTO
                            JOIN
                                AEROPORTO CHEGADA ON T.AERO_CHEGADA = CHEGADA.ID_AEROPORTO`;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        yield connection.close();
        resp.result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return resp;
    }
});
exports.executeSelectTrecho = executeSelectTrecho;
//seleciona todos os dados de um trecho especifico  
const executeSelectTrechoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                T.ID_TRECHO,
                                T.AERO_SAIDA,
                                T.AERO_CHEGADA,
                                SAIDA.NOME_AEROPORTO AS AEROPORTO_SAIDA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA
                            FROM
                                TRECHO T
                            JOIN
                                AEROPORTO SAIDA ON T.AERO_SAIDA = SAIDA.ID_AEROPORTO
                            JOIN
                                AEROPORTO CHEGADA ON T.AERO_CHEGADA = CHEGADA.ID_AEROPORTO
                            WHERE T.ID_TRECHO = ` + id;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        yield connection.close();
        resp.result = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        return resp;
    }
});
exports.executeSelectTrechoByID = executeSelectTrechoByID;
