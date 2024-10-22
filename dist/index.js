"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersRouter_1 = require("./routes/usersRouter");
const jsonMiddleware_1 = require("./middleware/jsonMiddleware");
dotenv_1.default.config();
const PORT = process.env.PORT;
const server = node_http_1.default.createServer(async (req, res) => {
    try {
        (0, jsonMiddleware_1.jsonMiddleware)(req, res, () => {
            (0, usersRouter_1.usersRouter)(req, res);
        });
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Something went wrong on the server!" }));
    }
});
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
