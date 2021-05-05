import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import RepositorioTransacao from '../repositories/transacao.repositorio';

import CriarTransacao from '../services/CriarTransacao';

import GarantirAutenticacao from '../middlewares/garantirAutenticacao';

const transacaoRouter = Router();

transacaoRouter.use(GarantirAutenticacao);

transacaoRouter.get('/', async (request, response) => {
  const { dataIni, dataFim } = request.params;

  const transacao = getCustomRepository(RepositorioTransacao);

  const transacoes = await transacao.consultaPeriodo({ dataIni, dataFim });

  return response.json({ transacoes });
});

transacaoRouter.get('/identificadas', async (request, response) => {
  const transacao = getCustomRepository(RepositorioTransacao);

  const transacoes = await transacao.consultaIdentificados();

  return response.json({ transacoes });
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
    obs,
  } = request.body;

  const criarTransacao = new CriarTransacao();

  const transacao = await criarTransacao.execute({
    categoria,
    usuario_id,
    tipo,
    valor,
    vencimento,
    periodicidade,
    parcelas,
    debitoAut,
    obs,
  });

  return response.json(transacao);
});

export default transacaoRouter;
