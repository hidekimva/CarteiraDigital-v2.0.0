"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _categorias = _interopRequireDefault(require("../models/categorias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AlterandoCategoria {
  async execute(id, nome) {
    const categorias = (0, _typeorm.getRepository)(_categorias.default);
    const categoriaNome = await categorias.findOne({
      where: {
        nome
      }
    });

    if (categoriaNome) {
      throw new _AppError.default('O nome ja esta em uso, nao pode ser alterado');
    }

    const categoriaExiste = await categorias.findOne(id);

    if (!categoriaExiste) {
      throw new _AppError.default('Categoria nao encontrada para ser alterada');
    }

    if (categoriaExiste.nome === nome) {
      throw new _AppError.default('Nome da categoria ja e este');
    }

    categoriaExiste.nome = nome;
    await categorias.save(categoriaExiste);
    return categoriaExiste;
  }

}

var _default = AlterandoCategoria;
exports.default = _default;