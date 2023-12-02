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
exports.executeInsertAeronave = exports.executeInsertVoo = exports.executeInsertVenda = exports.executeInsertAeroporto = exports.executeInsertTrecho = exports.executeInsertCidade = exports.executeInsertMetodoPagamento = exports.executeInsertCompanhiaAerea = void 0;

exports.executeInsertVenda = exports.executeInsertAeroporto = exports.executeInsertTrecho = exports.executeInsertCidade = exports.executeInsertMetodoPagamento = exports.executeInsertCompanhiaAerea = void 0;

const oracledb_1 = __importDefault(require("oracledb"));

const config_1 = require("./config");

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
        } else {
            resp.err = 'Erro ao inserir dado na tabela';
        }
    } catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        } else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        if (connection !== undefined) {
            yield connection.close();
        }
        return resp;
    }
});
exports.executeInsertCompanhiaAerea = executeInsertCompanhiaAerea;
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
const executeInsertCidade = (nomeCidade) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let insertString = `INSERT INTO CIDADE
        (ID_CIDADE, NOME_CIDADE)
        VALUES (ID_CIDADE_SEQ.NEXTVAL, '` + nomeCidade + `')`;
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
exports.executeInsertCidade = executeInsertCidade;
const executeInsertTrecho = (saida, chegada) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `INSERT INTO TRECHO 
        (ID_TRECHO, AERO_SAIDA, AERO_CHEGADA)
        VALUES (ID_TRECHO_SEQ.NEXTVAL,` + saida + `,` + chegada + `)`;
        let resInsert = yield connection.execute(updateString);
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
        return resp;
    }
});
exports.executeInsertTrecho = executeInsertTrecho;
const executeInsertAeroporto = (idCidade, nomeAeroporto, sigla) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `INSERT INTO AEROPORTO 
        (ID_AEROPORTO, ID_CIDADE, NOME_AEROPORTO, SIGLA)
        VALUES (ID_AEROPORTO_SEQ.NEXTVAL, ` + idCidade + `,'` + nomeAeroporto + `','` + sigla + `')`;
        let resInsert = yield connection.execute(updateString);
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
        return resp;
    }
});
exports.executeInsertAeroporto = executeInsertAeroporto;
const executeInsertVenda = (nome, email, idAssento, idVoo, pagamento) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `insert into venda (id_venda, nome_passageiro, EMAIL_PASSAGEIRO, ASSENTO, id_voo, pagamento) values (ID_VENDA_SEQ.nextval, '` + nome + `', '` + email + `', ` + idAssento + `,` + idVoo + `,` + pagamento + `)`;
        let resInsert = yield connection.execute(updateString);
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
        return resp;
    }
});
exports.executeInsertVenda = executeInsertVenda;
const executeInsertVoo = (trecho, aeronave, dataVoo, hora_partida, hora_chegada, preco) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `insert into voo 
        (ID_VOO, TRECHO, AERONAVE, DATA, HORA_PARTIDA, HORA_CHEGADA, PRECO) 
        VALUES (id_voo_seq.nextval, ` + trecho + `,` + aeronave + `, TO_DATE('` + dataVoo + `', 'yyyy-mm-dd'), '` + hora_partida + `', '` + hora_chegada + `', ` + preco + `)`;
        let resInsert = yield connection.execute(updateString);
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
        return resp;
    }
});
exports.executeInsertVoo = executeInsertVoo;
const executeInsertAeronave = (modelo, identificacao, fabricante, anoFabricacao, compahiaAerea, numAssento) => __awaiter(void 0, void 0, void 0, function* () {
    let resp = { result: undefined, err: null };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        let updateString = `INSERT INTO AERONAVE 
        (ID_AERONAVE, MODELO, NUM_IDENTIFICACAO, FABRICANTE, ANO_FABRICACAO, COMPANHIA_AEREA, NUMASSENTOS) 
        VALUES (ID_AERONAVE_SEQ.nextval, '` + modelo + `', '` + identificacao + `', '` + fabricante + `', ` + anoFabricacao + `,` + compahiaAerea + `, ` + numAssento + `)`;
        let resInsert = yield connection.execute(updateString);
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
        return resp;
    }
});
exports.executeInsertAeronave = executeInsertAeronave;
=======
exports.executeInsertCompanhiaAerea =
>>>>>>> e3e6be7f255c5b92fc0ab6efe464bd3ca79ddaff
