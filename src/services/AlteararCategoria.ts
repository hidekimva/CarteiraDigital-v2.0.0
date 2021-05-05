import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Categorias from '../models/categorias';

class AlterandoCategoria {
  public async execute(id: string, nome: string): Promise<Categorias> {
    const categorias = getRepository(Categorias);

    const categoriaNome = await categorias.findOne({ where: { nome } });

    if (categoriaNome) {
      throw new AppError('O nome ja esta em uso, nao pode ser alterado');
    }

    const categoriaExiste = await categorias.findOne(id);

    if (!categoriaExiste) {
      throw new AppError('Categoria nao encontrada para ser alterada');
    }

    if (categoriaExiste.nome === nome) {
      throw new AppError('Nome da categoria ja e este');
    }

    categoriaExiste.nome = nome;

    await categorias.save(categoriaExiste);

    return categoriaExiste;
  }
}

export default AlterandoCategoria;
