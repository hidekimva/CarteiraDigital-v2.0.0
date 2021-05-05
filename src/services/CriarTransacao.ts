import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transacao from '../models/transacoes';

import RepositorioTransacao from '../repositories/transacao.repositorio';

interface RequestDTO {
  categoria: string;
  usuario_id: string;
  tipo: string;
  vencimento: Date;
  periodicidade: string;
  parcelas: number;
  debitoAut: number;
  valor: number;
  obs: string;
}

interface Totais {
  entrada: number;
  saida: number;
  total: number;
}

interface Response {
  transacao: Transacao;
  totais: Totais;
}

class CriandoTransacao {
  public async execute({
    categoria,
    usuario_id,
    tipo,
    valor,
    vencimento,
    periodicidade,
    parcelas,
    debitoAut,
    obs,
  }: RequestDTO): Promise<Response> {
    const repositorioTransacao = getCustomRepository(RepositorioTransacao);

    const { total } = await repositorioTransacao.getBalance();

    if (tipo === 'saida' && total < valor) {
      throw new AppError('Voce nao tem saldo suficiente!');
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
      valor,
    });

    await repositorioTransacao.save(transacao);

    const totais = await repositorioTransacao.getBalance();

    return { transacao, totais };
  }
}

export default CriandoTransacao;
