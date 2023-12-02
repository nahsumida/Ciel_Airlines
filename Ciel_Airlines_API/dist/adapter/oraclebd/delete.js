"use strict"; // Ativa o modo estrito no JavaScript, tornando o código mais seguro e evitando certos tipos de erros.

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// As linhas acima definem um utilitário chamado __awaiter para simplificar o uso de Promises com a sintaxe async/await.

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Semelhante ao __awaiter, isso define um utilitário para importar módulos que podem ter diferentes formatos de módulo.

Object.defineProperty(exports, "__esModule", { value: true });
// Esta linha é gerada automaticamente pelo TypeScript para indicar que o arquivo é um módulo TypeScript.

exports.executeDeleteByID = void 0;
// Essa linha exporta uma função chamada executeDeleteByID. Essa função é definida mais adiante no código.

const oracledb_1 = __importDefault(require("oracledb"));
// Importa o pacote 'oracledb' que fornece acesso ao banco de dados Oracle.

const config_1 = require("./config");
// Importa um módulo chamado 'config' de um arquivo local chamado 'config.js'.

const executeDeleteByID = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Define uma função assíncrona chamada executeDeleteByID com parâmetros table e id.

    let resp = { result: undefined, err: null };
    // Declara um objeto chamado `resp` para armazenar o resultado da operação de exclusão.

    let connection;
    console.log("cheguei aqui");
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        // Estabelece uma conexão com o banco de dados Oracle usando as informações de conexão definidas em 'config_1.oraConnAttribs'.

        let deleteString = `DELETE ` + table + ` WHERE ID_` + table + ` = ` + id;
        // Cria uma string SQL para a operação de exclusão com base no nome da tabela e no ID fornecido.

        console.log(deleteString);
        let resDelete = yield connection.execute(deleteString);
        // Executa a operação de exclusão no banco de dados.

        yield connection.commit();
        // Confirma as alterações feitas na transação.

        yield connection.close();
        // Fecha a conexão com o banco de dados.

        const rowsDeleted = resDelete.rowsAffected;
        // Obtém o número de registros afetados pela operação de exclusão.

        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            resp.result = rowsDeleted;
        } else {
            resp.err = "Dado não excluído. Verifique se o id informado está correto.";
        }
    } catch (e) {
        if (e instanceof Error) {
            resp.err = e.message;
            console.log(e.message);
        } else {
            resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        }
    } finally {
        return resp;
    }
});
// Exporta a função executeDeleteByID que deleta registros com base em uma tabela e ID específicos.

exports.executeDeleteByID = executeDeleteByID;
// Exporta a função para ser utilizada em outros módulos ou scripts.
