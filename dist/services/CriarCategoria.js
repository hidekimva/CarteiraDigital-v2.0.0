"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _categorias = _interopRequireDefault(require("../models/categorias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CriandoCategoriaService {
  async execute(nome) {
    const categorias = (0, _typeorm.getRepository)(_categorias.default);
    const categoriaExiste = await categorias.findOne({
      where: {
        nome
      }
    });

    if (categoriaExiste) {
      throw new _AppError.default('Categoria ja existe');
    }

    const categoria = await categorias.create({
      nome
    });
    await categorias.save(categoria);
    return categoria;
  }

}

var _default = CriandoCategoriaService;
exports.default = _default;