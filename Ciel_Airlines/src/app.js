"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
1;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.send("Hello World");
});
app.use((error, req, res, next) => {
    res.status(500).send(error.message);
});
exports.default = app;
