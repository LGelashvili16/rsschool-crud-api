"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonMiddleware = void 0;
const jsonMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
};
exports.jsonMiddleware = jsonMiddleware;
