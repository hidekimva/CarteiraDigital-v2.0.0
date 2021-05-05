"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = garantirAutenticacao;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _autenticacao = _interopRequireDefault(require("../config/autenticacao"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function garantirAutenticacao(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('Esta faltando o token JWT.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _autenticacao.default.jwt.secret);
    const {
      sub
    } = decoded;
    request.usuario = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.default('token JWT invalido', 401);
  }
}