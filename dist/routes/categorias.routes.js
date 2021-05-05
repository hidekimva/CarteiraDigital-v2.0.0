"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _categorias = _interopRequireDefault(require("../models/categorias"));

var _CriarCategoria = _interopRequireDefault(require("../services/CriarCategoria"));

var _AlteararCategoria = _interopRequireDefault(require("../services/AlteararCategoria"));

var _garantirAutenticacao = _interopRequireDefault(require("../middlewares/garantirAutenticacao"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CategoriaRouter = (0, _express.Router)();
CategoriaRouter.use(_garantirAutenticacao.default);
CategoriaRouter.get('/', async (request, response) => {
  const Repositorios = (0, _typeorm.getRepository)(_categorias.default);
  const categorias = await Repositorios.find();
  return response.json(categorias);
});
CategoriaRouter.post('/', async (request, response) => {
  const {
    nome
  } = request.body;
  const novaCategoria = new _CriarCategoria.default();
  const categoria = await novaCategoria.execute(nome);
  return response.json(categoria);
});
CategoriaRouter.patch('/', async (request, response) => {
  const {
    id
  } = request.params;
  const {
    nome
  } = request.body;
  const alterarCategoria = new _AlteararCategoria.default();
  const categoria = await alterarCategoria.execute(id, nome);
  return response.json(categoria);
});
var _default = CategoriaRouter;
exports.default = _default;