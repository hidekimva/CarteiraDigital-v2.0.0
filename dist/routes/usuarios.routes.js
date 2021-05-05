"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CriarUsuario = _interopRequireDefault(require("../services/CriarUsuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usuarioRouter = (0, _express.Router)();
usuarioRouter.post('/', async (request, response) => {
  const {
    nome,
    email,
    senha
  } = request.body;
  const criarUsuario = new _CriarUsuario.default();
  const usuario = await criarUsuario.execute({
    nome,
    email,
    senha
  }); // delete usuario.senha;

  return response.json(usuario);
});
var _default = usuarioRouter;
exports.default = _default;