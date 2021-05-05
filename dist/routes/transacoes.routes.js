"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _transacao = _interopRequireDefault(require("../repositories/transacao.repositorio"));

var _CriarTransacao = _interopRequireDefault(require("../services/CriarTransacao"));

var _garantirAutenticacao = _interopRequireDefault(require("../middlewares/garantirAutenticacao"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transacaoRouter = (0, _express.Router)();
transacaoRouter.use(_garantirAutenticacao.default);
transacaoRouter.get('/', async (request, response) => {
  const {
    dataIni,
    dataFim
  } = request.query;
  const transacao = (0, _typeorm.getCustomRepository)(_transacao.default);
  const transacoes = await transacao.consultaPeriodo({
    dataIni,
    dataFim
  });
  return response.json({
    transacoes
  });
});
transacaoRouter.get('/identificadas', async (request, response) => {
  const transacao = (0, _typeorm.getCustomRepository)(_transacao.default);
  const transacoes = await transacao.consultaIdentificados();
  return response.json({
    transacoes
  });
});
transacaoRouter.post('/', async (request, response) => {
  const {
    categoria,
    usuario_id,
    tipo,
    valor,
    vencimento,
    periodicidade,
    parcelas,
    debitoAut,
    obs
  } = request.body;
  const criarTransacao = new _CriarTransacao.default();
  const transacao = await criarTransacao.execute({
    categoria,
    usuario_id,
    tipo,
    valor,
    vencimento,
    periodicidade,
    parcelas,
    debitoAut,
    obs
  });
  return response.json(transacao);
});
var _default = transacaoRouter;
exports.default = _default;