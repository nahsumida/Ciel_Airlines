"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(`${process.env.PORT || 3000}`);
const app_1 = __importDefault(require("./app"));
app_1.default.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
