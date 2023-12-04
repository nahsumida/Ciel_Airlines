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
exports.executeUpdateVoo = exports.executeUpdateAeronave = exports.executeUpdateAeroporto = exports.executeUpdateTrecho = exports.executeUpdateAssento = exports.executeUpdateCidade = exports.executeUpdateMetodoPagamento = exports.executeUpdateCompanhiaAerea = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = require("./config");
//atualiza um dado de companhia aerea no banco de dados
const executeUpdateCompanhiaAerea = (id, nomeCompanhiaAerea) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    const updateString = `UPDATE COMPANHIA_AEREA
    SET NOME_COMPANHIA = '` + nomeCompanhiaAerea + `'
    WHERE ID_COMPANHIA_AEREA = ` + id;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        console.log(updateString);
        const resUpdate = yield connection.execute(updateString);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
        }
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        return resp;
    }
});
exports.executeUpdateCompanhiaAerea = executeUpdateCompanhiaAerea;
//atualiza um dado de metodo pagamento no banco de dados
const executeUpdateMetodoPagamento = (id, nomeMetodo) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    const updateString = `UPDATE METODO_PAGAMENTO
    SET NOME_METODO = '` + nomeMetodo + `'
    WHERE ID_METODO_PAGAMENTO = ` + id;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        console.log(updateString);
        const resUpdate = yield connection.execute(updateString);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
        }
    }
    catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        }
        else {
            resp.err = "Erro ao conectar ao Oracle. Sem detalhes";
        }
    }
    finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        return resp;
    }
});
exports.executeUpdateMetodoPagamento = executeUpdateMetodoPagamento;
//atualiza os dados de uma cidade de id especifico
const executeUpdateCidade = (id, nomeCidade) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `Update cidade set nome_cidade = '` + nomeCidade + `' where id_cidade = ` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateCidade = executeUpdateCidade;
//atualiza os dados de um assento de id especifico
const executeUpdateAssento = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `Update assento set status = '` + status + `' where id_assento = ` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateAssento = executeUpdateAssento;
//atualiza os dados de um assento de id especifico
const executeUpdateTrecho = (id, aeroSaida, aeroChegada) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `Update trecho set aero_saida = ` + aeroSaida + `, aero_chegada = ` + aeroChegada + ` where id_trecho = ` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateTrecho = executeUpdateTrecho;
//atualiza os dados de um assento de id especifico
const executeUpdateAeroporto = (id, idCidade, nomeAeroporto, sigla) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `update AEROPORTO set id_cidade=` + idCidade + ` ,nome_aeroporto='` + nomeAeroporto + `', sigla='` + sigla + `' where ID_AEROPORTO = ` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        console.log(resUpdate);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateAeroporto = executeUpdateAeroporto;
//atualiza os dados de um assento de id especifico
const executeUpdateAeronave = (id, modelo, numIdentificacao, fabricante, anoFabricacao, compahiaAerea) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `update aeronave set modelo='` + modelo + `', NUM_IDENTIFICACAO = '` + numIdentificacao + `', FABRICANTE = '` + fabricante + `', ANO_FABRICACAO= ` + anoFabricacao + `, COMPANHIA_AEREA = ` + compahiaAerea + `where ID_AERONAVE = ` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        console.log(resUpdate);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateAeronave = executeUpdateAeronave;
//atualiza os dados de um assento de id especifico
const executeUpdateVoo = (id, data, trecho, horaChegada, horaPartida, preco, aeronave) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `update voo set data=TO_DATE('` + data + `', 'yyyy-mm-dd'), trecho=` + trecho + `, HORA_CHEGADA='` + horaChegada + `', HORA_PARTIDA='` + horaPartida + `', preco=` + preco + `, AERONAVE=` + aeronave + ` where ID_VOO =` + id;
        console.log(updateString);
        let resUpdate = yield connection.execute(updateString);
        console.log(resUpdate);
        yield connection.commit();
        const rowsAffected = resUpdate.rowsAffected;
        if (rowsAffected !== undefined && rowsAffected === 1) {
            resp.result = rowsAffected;
        }
        else {
            resp.err = 'Erro ao atualizar dado na tabela';
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
exports.executeUpdateVoo = executeUpdateVoo;
