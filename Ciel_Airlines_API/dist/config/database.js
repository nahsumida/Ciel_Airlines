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
const oracledb_1 = __importDefault(require("oracledb"));
const dotenv_1 = __importDefault(require("dotenv"));
oracledb_1.default.outFormat = oracledb_1.default.OUT_FORMAT_OBJECT;
dotenv_1.default.config();
function fun() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield oracledb_1.default.getConnection({
                user: process.env.ORACLE_DB_USER,
                password: process.env.ORACLE_DB_SECRET,
                connectString: process.env.ORACLE_DB_CONN_STR
            });
            const data = yield connection.execute(`Select * from teste`);
            console.log(data.rows);
        }
        catch (err) {
            console.log(err);
        }
    });
}
fun();
