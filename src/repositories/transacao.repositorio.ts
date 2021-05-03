import { EntityRepository, getRepository, Repository } from 'typeorm';

import Transacao from '../models/transacoes';

interface Balance {
  entrada: number;
  saida: number;
  total: number;
}

@EntityRepository(Transacao)
class RepositorioTrasacao extends Repository<Transacao> {
  public async obterTotal(): Promise<void> {
    let acomulador: Balance;
    const RepositorioTrasacoes = getRepository(Transacao);
    const transacoes = await RepositorioTrasacoes.find();

    transacoes.forEach(function (transacao) {
      console.log(transacao);
      const { tipo } = transacao;

      switch (tipo) {
        case 'entrada':
          console.log(acomulador.entrada);
          acomulador.entrada += transacao.valor;
          console.log(acomulador.entrada);
          break;
        case 'saida':
          acomulador.saida += transacao.valor;
          console.log(acomulador.saida);
          break;
        default:
          break;
      }
      console.log(acomulador);
      return acomulador;
    });
  }
}

export default RepositorioTrasacao;
