"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var transacoes_routes_1 = __importDefault(require("./transacoes.routes"));
var categorias_routes_1 = __importDefault(require("./categorias.routes"));
var usuarios_routes_1 = __importDefault(require("./usuarios.routes"));
var sessoes_routes_1 = __importDefault(require("./sessoes.routes"));
var routes = express_1.Router();
routes.use('/transacao', transacoes_routes_1.default);
routes.use('/categorias', categorias_routes_1.default);
routes.use('/usuario', usuarios_routes_1.default);
routes.use('/sessao', sessoes_routes_1.default);
exports.default = routes;
