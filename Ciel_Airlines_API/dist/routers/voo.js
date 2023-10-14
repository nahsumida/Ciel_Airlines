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
exports.vooRouter = void 0;
const express_1 = __importDefault(require("express"));
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.vooRouter = express_1.default.Router();
dotenv_1.default.config();
exports.vooRouter.get("/listarVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cr = { status: "ERROR", message: "", payload: undefined, };
    try {
        const connection = yield oracledb_1.default.getConnection({
            user: process.env.ORACLE_DB_USER,
            password: process.env.ORACLE_DB_SECRET,
            connectString: process.env.ORACLE_DB_CONN_STR
        });
        let resSelect = yield connection.execute("SELECT * FROM VOO");
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
exports.vooRouter.delete("/excluirVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idVoo = req.body.idVoo;
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
        let resDelete = yield connection.execute(`DELETE VOO WHERE IDVOO = :1`, [idVoo]);
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
exports.vooRouter.post("/incluirVoo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    const trecho = req.body.trecho;
    const horaPartida = req.body.horaPartida;
    const horaChegada = req.body.horaChegada;
    const aeroIda = req.body.aeroIda;
    const aeroVolta = req.body.aeroVolta;
    const aeronave = req.body.aeronave;
    const preco = req.body.preco;
    // correção: verificar se tudo chegou para prosseguir com o cadastro.
    // verificar se chegaram os parametros
    // VALIDAR se estão bons (de acordo com os critérios - exemplo: 
    // não pode qtdeAssentos ser número e ao mesmo tempo o valor ser -5)
    // definindo um objeto de resposta.
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
        const cmdInsert = `INSERT INTO VOO 
        (IDVOO, DATA, TRECHO, HORAPARTIDA, HORACHEGADA, AEROIDA, AEROVOLTA, PRECO, AERONAVE)
        VALUES (ID_VOO_SEQ.NEXTVAL, :1, :2, :3, :4, :5, :6, :7, :8)`;
        const dados = [data, trecho, horaPartida, horaChegada, aeroIda, aeroVolta, preco, aeronave];
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
