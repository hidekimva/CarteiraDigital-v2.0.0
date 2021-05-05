"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _transacoes = _interopRequireDefault(require("./transacoes.routes"));

var _categorias = _interopRequireDefault(require("./categorias.routes"));

var _usuarios = _interopRequireDefault(require("./usuarios.routes"));

var _sessoes = _interopRequireDefault(require("./sessoes.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/transacao', _transacoes.default);
routes.use('/categorias', _categorias.default);
routes.use('/usuario', _usuarios.default);
routes.use('/sessao', _sessoes.default);
var _default = routes;
exports.default = _default;