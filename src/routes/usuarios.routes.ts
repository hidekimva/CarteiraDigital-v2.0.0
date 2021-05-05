import { Router } from 'express';

import CriarUsuario from '../services/CriarUsuario';

const usuarioRouter = Router();

usuarioRouter.post('/', async (request, response) => {
  const { nome, email, senha } = request.body;

  const criarUsuario = new CriarUsuario();

  const usuario = await criarUsuario.execute({
    nome,
    email,
    senha,
  });

  // delete usuario.senha;

  return response.json(usuario);
});

export default usuarioRouter;
