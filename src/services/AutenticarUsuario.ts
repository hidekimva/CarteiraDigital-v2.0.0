import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import ConfigAutenticacao from '../config/autenticacao';

import AppError from '../errors/AppError';

import Usuario from '../models/usuarios';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
  token: string;
}

class AutenticarUsuario {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new AppError('Email/Senha incorreto.', 401);
    }

    const passwordMatched = await compare(senha, usuario.senha);

    if (!passwordMatched) {
      throw new AppError('Email/Senha incorreto.', 401);
    }

    const { secret, expiresIn } = ConfigAutenticacao.jwt;

    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AutenticarUsuario;
