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
exports.executeSelectVendaByAssento = exports.executeSelectVenda = exports.searchTrecho = exports.searchVoo = exports.executeSelectVoo = exports.executeSelectVooByID = exports.executeSelectAeroportoByID = exports.executeSelectAeroporto = exports.executeSelectAeronaveByID = exports.executeSelectAeronave = exports.executeSelectTrechoByID = exports.executeSelectTrecho = exports.executeSelectAssentoByVoo = exports.executeSelectByID = exports.executeSelectAll = void 0;
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
        let selectString = `SELECT * FROM ` + table + ` WHERE ID_VOO = ` + idVoo + ` order by ID_Assento`;
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
SAIDA.SIGLA,
                                CHEGADA.NOME_AEROPORTO AS AEROPORTO_CHEGADA,
CHEGADA.SIGLA
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
//seleciona todos os dados de um aeronave especifico  
const executeSelectAeronave = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                A.ID_AERONAVE,
                                C.NOME_COMPANHIA,
                                A.MODELO,
                                A.ANO_FABRICACAO,
                                A.FABRICANTE,
                                A.NUM_IDENTIFICACAO,
                                A.NUMASSENTOS
                            FROM
                                AERONAVE A
                            JOIN
                                COMPANHIA_AEREA C ON C.ID_COMPANHIA_AEREA = A.COMPANHIA_AEREA`;
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
exports.executeSelectAeronave = executeSelectAeronave;
const executeSelectAeronaveByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                A.ID_AERONAVE,
                                C.NOME_COMPANHIA,
                                A.MODELO,
                                A.ANO_FABRICACAO,
                                A.FABRICANTE,
                                A.NUM_IDENTIFICACAO,
                                A.NUMASSENTOS
                            FROM
                                AERONAVE A
                            JOIN
                                COMPANHIA_AEREA C ON C.ID_COMPANHIA_AEREA = A.COMPANHIA_AEREA
                            WHERE A.ID_AERONAVE = ` + id;
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
exports.executeSelectAeronaveByID = executeSelectAeronaveByID;
//seleciona todos os dados de um aeroporto especifico  
const executeSelectAeroporto = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                A.ID_AEROPORTO,
                                A.NOME_AEROPORTO,
                                A.id_CIDADE,
                                i.NOME_CIDADE,
                                A.Sigla
                            FROM
                                AEROPORTO A
                            JOIN
                                CIDADE I ON I.ID_CIDADE = A.ID_CIDADE`;
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
exports.executeSelectAeroporto = executeSelectAeroporto;
//seleciona todos os dados de um aeroporto especifico  
const executeSelectAeroportoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
                                A.ID_AEROPORTO,
                                A.NOME_AEROPORTO,   
                                i.NOME_CIDADE,
                                A.Sigla
                            FROM
                                AEROPORTO A
                            JOIN
                                CIDADE I ON I.ID_CIDADE = A.ID_CIDADE
                            WHERE A.ID_AEROPORTO = ` + id;
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
exports.executeSelectAeroportoByID = executeSelectAeroportoByID;
//seleciona todos os dados de um aeroporto especifico  
const executeSelectVooByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        chegada.NOME_AEROPORTO,
        saida.NOME_AEROPORTO
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada
    where 
        v.id_voo = ` + id;
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
exports.executeSelectVooByID = executeSelectVooByID;
//seleciona todos os dados de um aeroporto especifico  
const executeSelectVoo = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        saida.SIGLA,
    chegada.SIGLA
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada`;
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
exports.executeSelectVoo = executeSelectVoo;
//seleciona todos os dados de um aeroporto especifico  
const searchVoo = (idTrecho, dataVoo) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
        v.ID_VOO,
        v.data,
        v.HORA_PARTIDA,
        v.HORA_CHEGADA,
        v.PRECO,
        a.NUM_IDENTIFICACAO,
        chegada.NOME_AEROPORTO,
        saida.NOME_AEROPORTO
    FROM
        VOO V
    JOIN
        trecho T on t.ID_TRECHO = v.TRECHO
    Join
        aeronave A on a.ID_AERONAVE = v.AERONAVE
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_saida
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_chegada
    where v.data = TO_DATE('` + dataVoo + `', 'yyyy-mm-dd') and v.TRECHO =` + idTrecho;
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
exports.searchVoo = searchVoo;
//seleciona todos os dados de um aeroporto especifico  
const searchTrecho = (aeroSaida, aeroChegada) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `select id_trecho from trecho where AERO_SAIDA = ` + aeroSaida + ` and aero_chegada = ` + aeroChegada;
        console.log(selectString);
        let resSelect = yield connection.execute(selectString);
        yield connection.close();
        if (((_a = (resSelect.rows)) === null || _a === void 0 ? void 0 : _a.length) != undefined && ((_b = (resSelect.rows)) === null || _b === void 0 ? void 0 : _b.length) < 1) {
            resp.result = 0;
        }
        else {
            resp.result = resSelect.rows;
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
        return resp;
    }
});
exports.searchTrecho = searchTrecho;
//seleciona todas as linhas da tabela 
const executeSelectVenda = () => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
        v.ID_VENDA,
        v.NOME_PASSAGEIRO,
        v.EMAIL_PASSAGEIRO,
        A.CODIGO,
        M.NOME_METODO,
        ve.DATA,
        ve.ID_VOO,
        saida.SIGLA,
        chegada.SIGLA
    FROM
        VENDA V
    JOIN
        ASSENTO A ON A.ID_ASSENTO = V.ASSENTO
    Join
        METODO_PAGAMENTO M ON M.ID_METODO_PAGAMENTO = V.PAGAMENTO
    join
        voo ve on ve.ID_VOO = v.ID_VOO
    JOIN
        trecho T on t.ID_TRECHO = ve.TRECHO
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_SAIDA
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_CHEGADA`;
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
exports.executeSelectVenda = executeSelectVenda;
//seleciona todas as linhas da tabela 
const executeSelectVendaByAssento = (idAssento) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let selectString = `SELECT
        v.ID_VENDA,
        v.NOME_PASSAGEIRO,
        v.EMAIL_PASSAGEIRO,
        A.CODIGO,
        M.NOME_METODO,
        ve.DATA,
        ve.ID_VOO,
        saida.SIGLA,
        chegada.SIGLA
    FROM
        VENDA V
    JOIN
        ASSENTO A ON A.ID_ASSENTO = V.ASSENTO
    Join
        METODO_PAGAMENTO M ON M.ID_METODO_PAGAMENTO = V.PAGAMENTO
    join
        voo ve on ve.ID_VOO = v.ID_VOO
    JOIN
        trecho T on t.ID_TRECHO = ve.TRECHO
    join
        AEROPORTO saida on saida.ID_AEROPORTO = t.AERO_SAIDA
    join
        AEROPORTO chegada on chegada.ID_AEROPORTO = t.AERO_CHEGADA
    where Assento =` + idAssento;
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
exports.executeSelectVendaByAssento = executeSelectVendaByAssento;
