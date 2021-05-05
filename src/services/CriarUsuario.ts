import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Usuario from '../models/usuarios';

interface RequestDTO {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuario {
  public async execute({ nome, email, senha }: RequestDTO): Promise<Usuario> {
    const usersRepository = getRepository(Usuario);

    const usuarioExiste = await usersRepository.findOne({
      where: { email },
    });

    if (usuarioExiste) {
      throw new AppError('Email ja esta em uso');
    }

    const hashedSenha = await hash(senha, 8);

    const usuario = usersRepository.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await usersRepository.save(usuario);

    return usuario;
  }
}

export default CriarUsuario;
