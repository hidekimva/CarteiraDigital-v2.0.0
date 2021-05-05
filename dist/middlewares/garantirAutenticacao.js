"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("../errors/AppError"));
var autenticacao_1 = __importDefault(require("../config/autenticacao"));
function garantirAutenticacao(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('Esta faltando o token JWT.', 401);
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, autenticacao_1.default.jwt.secret);
        var sub = decoded.sub;
        request.usuario = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('token JWT invalido', 401);
    }
}
exports.default = garantirAutenticacao;
