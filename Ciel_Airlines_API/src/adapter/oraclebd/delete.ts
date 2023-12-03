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

exports.executeInsertVenda = exports.executeInsertAeroporto = exports.executeInsertTrecho = exports.executeInsertCidade = exports.executeInsertMetodoPagamento = exports.executeInsertCompanhiaAerea = void 0;
// Essa linha exporta um conjunto de funções (executeInsertVenda, executeInsertAeroporto, etc.) para serem utilizadas em outros módulos ou scripts.

const oracledb_1 = __importDefault(require("oracledb"));
// Importa o pacote 'oracledb' que fornece acesso ao banco de dados Oracle.

const config_1 = require("./config");
// Importa um módulo chamado 'config' de um arquivo local chamado 'config.js'.

//insere um dado de companhia aerea no banco de dados
const executeInsertCompanhiaAerea = (nomeCompanhiaAerea) => __awaiter(void 0, void 0, void 0, function* () {
    // Essa função insere dados em uma tabela chamada `COMPANHIA_AEREA` no banco de dados Oracle.

    let resp = { result: undefined, err: null };
    // Declara um objeto `resp` que será usado para armazenar o resultado da operação de inserção. `result` será o número de registros inseridos, e `err` será uma mensagem de erro, se houver.

    let connection;
    try {
        connection = yield oracledb_1.default.getConnection(config_1.oraConnAttribs);
        // Estabelece uma conexão com o banco de dados Oracle usando as informações de conexão definidas em `config_1.oraConnAttribs`.

        let insertString = `INSERT INTO COMPANHIA_AEREA
        (ID_COMPANHIA_AEREA, NOME_COMPANHIA)
        VALUES (ID_COMPANHIA_SEQ.NEXTVAL, '` + nomeCompanhiaAerea + `')`;
        // Constrói uma string SQL para realizar a operação de inserção com base nos parâmetros fornecidos.

        console.log(insertString);
        let resInsert = yield connection.execute(insertString);
        // Executa a operação de inserção no banco de dados.

        yield connection.commit();
        // Confirma as alterações feitas na transação.

        const rowsInserted = resInsert.rowsAffected;
        // Obtém o número de registros afetados pela operação de inserção.

       if (rowsInserted !== undefined && rowsInserted === 1) {
    // Verifica se a operação de inserção foi bem-sucedida com base no número de registros inseridos.
    resp.result = rowsInserted;
    // Atribui o número de registros inseridos ao campo `result` do objeto `resp` se a condição for verdadeira.
} else {
    resp.err = 'Erro ao inserir dado na tabela';
    // Se a condição não for verdadeira, atribui uma mensagem de erro ao campo `err` do objeto `resp`.
}

} catch (e) {
    // Captura possíveis exceções durante a execução do bloco try.
    if (e instanceof Error) {
        resp.err = e.message;
        // Se a exceção for do tipo Error, atribui a mensagem de erro ao campo `err` do objeto `resp`.
        console.log(e.message);
        // Também imprime a mensagem de erro no console.
    } else {
        resp.err = "Erro ao conectar ao oracle. Sem detalhes";
        // Se a exceção não for do tipo Error, atribui uma mensagem de erro genérica ao campo `err` do objeto `resp`.
    }
} finally {
    // O bloco `finally` garante que a conexão com o banco de dados será fechada, independentemente de a operação ser bem-sucedida ou falhar.
    if (connection !== undefined) {
        yield connection.close();
        // Fecha a conexão com o banco de dados.
    }
    return resp;
    // Retorna o objeto `resp` após a conclusão da operação, contendo os resultados ou mensagens de erro.
}

});
exports.executeInsertCompanhiaAerea = executeInsertCompanhiaAerea;
// Define e exporta a função executeInsertCompanhiaAerea.
