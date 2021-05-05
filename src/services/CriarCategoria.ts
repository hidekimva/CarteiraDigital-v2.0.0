import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Categorias from '../models/categorias';

class CriandoCategoriaService {
  public async execute(nome: string): Promise<Categorias> {
    const categorias = getRepository(Categorias);

    const categoriaExiste = await categorias.findOne({ where: { nome } });

    if (categoriaExiste) {
      throw new AppError('Categoria ja existe');
    }

    const categoria = await categorias.create({ nome });

    await categorias.save(categoria);

    return categoria;
  }
}

export default CriandoCategoriaService;
