import { getCustomRepository } from 'typeorm';

import Transacao from '../models/transacoes';
import RepositorioTransacao from '../repositories/transacao.repositorio';

interface RequestDTO {
  nome: string;
  tipo: string;
  valor: number;
  obs: string;
}

class CriandoTransacao {
  public async execute({
    nome,
    tipo,
    obs,
    valor,
  }: RequestDTO): Promise<Transacao> {
    const repositorioTransacao = getCustomRepository(RepositorioTransacao);

    repositorioTransacao.obterTotal();

    const trans = repositorioTransacao.create({
      nome,
      tipo,
      observacao: obs,
      valor,
    });

    await repositorioTransacao.save(trans);

    return trans;
  }
}

export default CriandoTransacao;
