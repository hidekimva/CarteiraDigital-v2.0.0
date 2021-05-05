"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _transacao = _interopRequireDefault(require("../repositories/transacao.repositorio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CriandoTransacao {
  async execute({
    categoria,
    usuario_id,
    tipo,
    valor,
    vencimento,
    periodicidade,
    parcelas,
    debitoAut,
    obs
  }) {
    const repositorioTransacao = (0, _typeorm.getCustomRepository)(_transacao.default);
    const {
      total
    } = await repositorioTransacao.getBalance();

    if (tipo === 'saida' && total < valor) {
      throw new _AppError.default('Voce nao tem saldo suficiente!');
    }

    const transacao = repositorioTransacao.create({
      categoria_id: categoria,
      usuario_id,
      tipo,
      vencimento,
      periodicidade,
      parcelas,
      debitoAut,
      observacao: obs,
      valor
    });
    await repositorioTransacao.save(transacao);
    const totais = await repositorioTransacao.getBalance();
    return {
      transacao,
      totais
    };
  }

}

var _default = CriandoTransacao;
exports.default = _default;