import { Router } from 'express';
import { getRepository } from 'typeorm';

import CriandoTransacao from '../services/CriandoTransacao';
import Transacao from '../models/transacoes';

const transacaoRouter = Router();

transacaoRouter.get('/', async (request, response) => {
  const consultaTransacao = getRepository(Transacao);

  const trasacoes = await consultaTransacao.find();

  return response.json(trasacoes);
});

transacaoRouter.post('/', async (request, response) => {
  const { nome, tipo, valor, obs } = request.body;

  const criandoTransacao = new CriandoTransacao();

  const teste = await criandoTransacao.execute({
    nome,
    tipo,
    obs,
    valor,
  });

  return response.json(teste);
});

export default transacaoRouter;
