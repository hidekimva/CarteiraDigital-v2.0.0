import {
  EntityRepository,
  getRepository,
  Repository,
  Between,
  Not,
  IsNull,
} from 'typeorm';
import { addDays } from 'date-fns';
import Transacao from '../models/transacoes';

interface Balance {
  entrada: number;
  saida: number;
  total: number;
}

interface filtro {
  dataIni: Date;
  dataFim: Date;
}

@EntityRepository(Transacao)
class RepositorioTransacao extends Repository<Transacao> {
  public async getBalance(): Promise<Balance> {
    const Repositorio = getRepository(Transacao);
    const dadosTransacao = await Repositorio.find();

    const { entrada, saida } = dadosTransacao.reduce(
      (accumulator: Balance, transacao: Transacao) => {
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
      },
      {
        entrada: 0,
        saida: 0,
        total: 0,
      },
    );

    const total = entrada - saida;

    return { entrada, saida, total };
  }

  public async consultaPeriodo({
    dataIni,
    dataFim,
  }: filtro): Promise<Transacao[]> {
    const categorias = getRepository(Transacao);
    const fim = await addDays(new Date(dataFim), 1);

    const transacoes = await categorias.find({
      criado_em: Between(dataIni, fim),
    });

    return transacoes;
  }

  public async consultaIdentificados(): Promise<Transacao[]> {
    const categorias = getRepository(Transacao);

    const transacoes = await categorias.find({
      usuario_id: Not(IsNull()),
    });

    return transacoes;
  }
}

export default RepositorioTransacao;
