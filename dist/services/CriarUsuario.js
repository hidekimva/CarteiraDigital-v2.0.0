"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _usuarios = _interopRequireDefault(require("../models/usuarios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CriarUsuario {
  async execute({
    nome,
    email,
    senha
  }) {
    const usersRepository = (0, _typeorm.getRepository)(_usuarios.default);
    const usuarioExiste = await usersRepository.findOne({
      where: {
        email
      }
    });

    if (usuarioExiste) {
      throw new _AppError.default('Email ja esta em uso');
    }

    const hashedSenha = await (0, _bcryptjs.hash)(senha, 8);
    const usuario = usersRepository.create({
      nome,
      email,
      senha: hashedSenha
    });
    await usersRepository.save(usuario);
    return usuario;
  }

}

var _default = CriarUsuario;
exports.default = _default;