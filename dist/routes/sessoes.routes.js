"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AutenticarUsuario = _interopRequireDefault(require("../services/AutenticarUsuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessaoRouter = (0, _express.Router)();
sessaoRouter.post('/', async (request, response) => {
  const {
    email,
    senha
  } = request.body;
  const authenticateUser = new _AutenticarUsuario.default();
  const {
    usuario,
    token
  } = await authenticateUser.execute({
    email,
    senha
  }); // delete usuario.senha;

  return response.json({
    usuario,
    token
  });
});
var _default = sessaoRouter;
exports.default = _default;