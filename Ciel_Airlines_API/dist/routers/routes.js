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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv_1 = __importDefault(require("dotenv"));
//const AeronaveController = require('./Ciel_Airlines/src/controllers/AeronaveController.ts');
const TesteController = require('C:/Users/Cliente/Documents/GitHub/Ciel_Airlines/Ciel_Airlines_API/src/controllers/TesteController.ts');
exports.router = express_1.default.Router();
dotenv_1.default.config();
oracledb_1.default.createPool({
    user: process.env.ORACLE_DB_USER,
    password: process.env.ORACLE_DB_SECRET,
    connectString: process.env.ORACLE_DB_CONN_STR,
    poolTimeout: 5000
});
exports.router.get('/', (req, res) => {
    return res.json({ mensagem: "Api atualizada" });
});
/*
//retorna todos as aeronaves
router.get('/get-aeronave', AeronaveController.getAeronave);

router.get('/teste',TesteController.get);

*/
exports.router.get("/listarTeste", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resSelect = yield connection.execute("SELECT * FROM TEST");
        yield connection.close();
        cr.status = "SUCCESS";
        cr.message = "Dados obtidos";
        cr.payload = resSelect.rows;
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        res.send(cr);
    }
}));
exports.router.delete("/excluirTeste", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test_id = req.body.idtest;
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resDelete = yield connection.execute(`DELETE TEST WHERE TEST_ID = :1`, [test_id]);
        yield connection.commit();
        yield connection.close();
        const rowsDeleted = resDelete.rowsAffected;
        if (rowsDeleted !== undefined && rowsDeleted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Dado excluído.";
        }
        else {
            cr.message = "Dado não excluído. Verifique se o id informado está correto.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        res.send(cr);
    }
}));
exports.router.post("/inserirTeste", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idteste = req.body.idteste;
    const nametest = req.body.nametest;
    let cr = {
        status: "ERROR",
        message: "",
        payload: undefined,
    };
    let connection;
    try {
        connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        const cmdInsert = `INSERT INTO TEST 
    (TEST_ID, TEST_NAME)
    VALUES (:1, :2)`;
        const dados = [idteste, nametest];
        let resInsert = yield connection.execute(cmdInsert, dados);
        yield connection.commit();
        const rowsInserted = resInsert.rowsAffected;
        console.log(rowsInserted);
        if (rowsInserted !== undefined && rowsInserted === 1) {
            cr.status = "SUCCESS";
            cr.message = "Dado inserido.";
        }
    }
    catch (e) {
        if (e instanceof Error) {
            cr.message = e.message;
            '\s';
            console.log(e.message);
        }
        else {
            cr.message = "Erro ao conectar ao oracle. Sem detalhes";
        }
    }
    finally {
        if (connection) {
            try {
                yield connection.close({ drop: true });
            }
            catch (err) {
                console.error(err);
            }
        }
        res.send(cr);
    }
}));
