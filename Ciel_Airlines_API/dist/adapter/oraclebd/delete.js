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
Object.defineProperty(exports, "__esModule", { value: true }); // Esta linha é gerada automaticamente pelo TypeScript para indicar que o arquivo é um módulo TypeScript.
exports.executeDeleteByID = void 0;  //deleta todos os dados de um id especifico
const oracledb_1 = __importDefault(require("oracledb"));
const config_1 = require("./config");
const executeDeleteByID = (table, id) => __awaiter(void 0, void 0, void 0, function* () { // Essa função é projetada para excluir registros de uma tabela Oracle com base no ID fornecido //  - `table`: Nome da tabela de onde os dados serão excluídos,`id`: Valor do ID usado para determinar qual registro será excluído.

    let resp = { result: undefined, err: null }; // Declara um objeto chamado `resp` que será usado para armazenar o resultado da operação de exclusão. `result` será o número de registros excluídos, e `err` será uma mensagem de erro, se houver
    let connection;
    console.log("cheguei aqui");
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs); //Estabelece uma conexão com o banco de dados Oracle.
        let deleteString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id; // Cria uma string SQL para a operação de exclusão com base no nome da tabela e no ID fornecido.
        console.log(deleteString);
        let resDelete = yield connection.execute(deleteString); // Executa a operação de exclusão no banco de dados.
        yield connection.commit(); // Confirma as alterações feitas na transação.
        yield connection.close(); // Fecha a conexão com o banco de dados.
        const rowsDeleted = resDelete.rowsAffected; // Obtém o número de registros afetados pela operação de exclusão.
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            resp.result = rowsDeleted;
        }
        else {
            resp.err = "Dado não excluído. Verifique se o id informado está correto.";
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
exports.executeDeleteByID = executeDeleteByID;


        
