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
exports.executeInsertVenda = exports.executeInsertAeroporto = exports.executeInsertTrecho = exports.executeInsertCidade = exports.executeInsertMetodoPagamento = exports.executeInsertCompanhiaAerea = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = require("./config");
//insere um dado de companhia aerea no banco de dados
const executeInsertCompanhiaAerea = (nomeCompanhiaAerea) => __awaiter(void 0, void 0, void 0, function* () { // Essa função insere dados em uma tabela chamada `COMPANHIA_AEREA` no banco de dados Oracle
    let resp = { result: undefined, err: null }; // Declara um objeto `resp` que será usado para armazenar o resultado da operação de inserção. `result` será o número de registros inseridos e `err` será uma mensagem de erro, se houver.
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs); // Estabelece uma conexão com o banco de dados Oracle usando as informações de conexão definidas em `config_1.oraConnAttribs`.
        let insertString = `INSERT INTO COMPANHIA_AEREA // Constrói uma string SQL para realizar a operação de inserção com base nos parâmetros fornecidos.
        (ID_COMPANHIA_AEREA, NOME_COMPANHIA)
        VALUES (ID_COMPANHIA_SEQ.NEXTVAL, '` + nomeCompanhiaAerea + `')`;
        console.log(insertString);
        let resInsert = yield connection.execute(insertString); // Executa a operação de inserção no banco de dados.
        yield connection.commit(); // Confirma as alterações feitas na transação.
        const rowsInserted = resInsert.rowsAffected; // Obtém o número de registros afetados pela operação de inserção.
        if (rowsInserted !== undefined && rowsInserted === 1) { //Verifica se a operação foi bem-sucedida com base no número de registros inseridos.
            resp.result = rowsInserted; // Atribui o número de registros inseridos ao campo `result` do objeto `resp`.
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
    finally { // O bloco `finally` garante que a conexão com o banco de dados será fechada, independentemente de a operação ser bem-sucedida ou falhar.

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
// insere um dado de cidade no banco de dados 
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
//atualiza a o aeroporto de ida e de volta de um trecho
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
//atualiza a o aeroporto de ida e de volta de um trecho
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
//atualiza a o aeroporto de ida e de volta de um trecho
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
