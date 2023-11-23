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
exports.executeInsertVenda = exports.executeInsertVoo = exports.executeInsertAeroporto = exports.executeInsertAeronave = exports.executeInsertTrecho = exports.executeInsertMapaAssento = exports.executeInsertMetodoPagamento = exports.executeInsertCompanhiaAerea = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = require("./config");
//insere um dado de companhia aerea no banco de dados
const executeInsertCompanhiaAerea = (nomeCompanhiaAerea) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let insertString = `INSERT INTO COMPANHIA_AEREA 
        (ID_COMPANHIA_AEREA, NOME_COMPANHIA)
        VALUES (ID_COMPANHIA_SEQ.NEXTVAL, '` + nomeCompanhiaAerea + `')`;
        console.log(insertString);
        let resInsert = yield connection.execute(insertString);
        yield connection.commit();
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            resp.result = rowsInserted;
        }
        else {
            resp.err = 'Erro ao inserir dado na tabela';
        }
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
exports.executeInsertCompanhiaAerea = executeInsertCompanhiaAerea;
//insere um dado de companhia aerea no banco de dados
const executeInsertMetodoPagamento = (nomeMetodo) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let insertString = `INSERT INTO METODO_PAGAMENTO 
        (ID_METODO_PAGAMENTO, NOME_METODO)
        VALUES (ID_METODO_SEQ.NEXTVAL, '` + nomeMetodo + `')`;
        console.log(insertString);
        let resInsert = yield connection.execute(insertString);
        yield connection.commit();
        const rowsInserted = resInsert.rowsAffected;
        if (rowsInserted !== undefined && rowsInserted === 1) {
            resp.result = rowsInserted;
        }
        else {
            resp.err = 'Erro ao inserir dado na tabela';
        }
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
exports.executeInsertMetodoPagamento = executeInsertMetodoPagamento;
//atualiza o status de um assento do mapa
const executeInsertMapaAssento = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let updateString = `Update mapa_assento set status = '` + status + `' where id_mapa_assento = ` + id;
        let resSelect = yield connection.execute(updateString);
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
exports.executeInsertMapaAssento = executeInsertMapaAssento;
//atualiza a o aeroporto de ida e de volta de um trecho
const executeInsertTrecho = (id, saida, chegada) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let updateString = `Update trecho set aero_saida = ` + saida + `, aero_chegada = ` + chegada + ` where id_trecho = ` + id;
        let resSelect = yield connection.execute(updateString);
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
exports.executeInsertTrecho = executeInsertTrecho;
///////////////////
const executeInsertAeronave = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let updateString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id;
        let resSelect = yield connection.execute(updateString);
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
exports.executeInsertAeronave = executeInsertAeronave;
const executeInsertAeroporto = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let deleteString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id;
        let resSelect = yield connection.execute(deleteString);
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
exports.executeInsertAeroporto = executeInsertAeroporto;
const executeInsertVoo = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let deleteString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id;
        let resSelect = yield connection.execute(deleteString);
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
exports.executeInsertVoo = executeInsertVoo;
const executeInsertVenda = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let deleteString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id;
        let resSelect = yield connection.execute(deleteString);
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
exports.executeInsertVenda = executeInsertVenda;
