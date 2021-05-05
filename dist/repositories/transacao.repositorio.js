"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _dateFns = require("date-fns");

var _transacoes = _interopRequireDefault(require("../models/transacoes"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RepositorioTransacao = (_dec = (0, _typeorm.EntityRepository)(_transacoes.default), _dec(_class = class RepositorioTransacao extends _typeorm.Repository {
  async getBalance() {
    const Repositorio = (0, _typeorm.getRepository)(_transacoes.default);
    const dadosTransacao = await Repositorio.find();
    const {
      entrada,
      saida
    } = dadosTransacao.reduce((accumulator, transacao) => {
      switch (transacao.tipo) {
        case 'entrada':
          accumulator.entrada += transacao.valor;
          break;

        case 'saida':
          accumulator.saida += transacao.valor;
          break;

        default:
          break;
      }

      return accumulator;
    }, {
      entrada: 0,
      saida: 0,
      total: 0
    });
    const total = entrada - saida;
    return {
      entrada,
      saida,
      total
    };
  }

  async consultaPeriodo({
    dataIni,
    dataFim
  }) {
    const categorias = (0, _typeorm.getRepository)(_transacoes.default);
    const fim = await (0, _dateFns.addDays)(new Date(dataFim), 1);
    const transacoes = await categorias.find({
      criado_em: (0, _typeorm.Between)(dataIni, fim)
    });
    return transacoes;
  }

  async consultaIdentificados() {
    const categorias = (0, _typeorm.getRepository)(_transacoes.default);
    const transacoes = await categorias.find({
      usuario_id: (0, _typeorm.Not)((0, _typeorm.IsNull)())
    });
    return transacoes;
  }

}) || _class);
var _default = RepositorioTransacao;
exports.default = _default;