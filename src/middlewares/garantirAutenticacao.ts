import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import configAutenticacao from '../config/autenticacao';

interface tokenPayload {
  iar: number;
  exp: number;
  sub: string;
}

export default function garantirAutenticacao(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Esta faltando o token JWT.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, configAutenticacao.jwt.secret);

    const { sub } = decoded as tokenPayload;

    request.usuario = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('token JWT invalido', 401);
  }
}
