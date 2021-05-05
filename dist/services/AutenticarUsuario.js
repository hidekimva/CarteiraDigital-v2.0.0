"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _autenticacao = _interopRequireDefault(require("../config/autenticacao"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _usuarios = _interopRequireDefault(require("../models/usuarios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AutenticarUsuario {
  async execute({
    email,
    senha
  }) {
    const usuarioRepository = (0, _typeorm.getRepository)(_usuarios.default);
    const usuario = await usuarioRepository.findOne({
      where: {
        email
      }
    });

    if (!usuario) {
      throw new _AppError.default('Email/Senha incorreto.', 401);
    }

    const passwordMatched = await (0, _bcryptjs.compare)(senha, usuario.senha);

    if (!passwordMatched) {
      throw new _AppError.default('Email/Senha incorreto.', 401);
    }

    const {
      secret,
      expiresIn
    } = _autenticacao.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: usuario.id,
      expiresIn
    });
    return {
      usuario,
      token
    };
  }

}

var _default = AutenticarUsuario;
exports.default = _default;