import { Router } from 'express';
import { getRepository } from 'typeorm';
import Categorias from '../models/categorias';
import CriarCategoria from '../services/CriarCategoria';
import AlterarCategoria from '../services/AlteararCategoria';

import GarantirAutenticacao from '../middlewares/garantirAutenticacao';

const CategoriaRouter = Router();

CategoriaRouter.use(GarantirAutenticacao);

CategoriaRouter.get('/', async (request, response) => {
  const Repositorios = getRepository(Categorias);

  const categorias = await Repositorios.find();

  return response.json(categorias);
});

CategoriaRouter.post('/', async (request, response) => {
  const { nome } = request.body;

  const novaCategoria = new CriarCategoria();

  const categoria = await novaCategoria.execute(nome);

  return response.json(categoria);
});

CategoriaRouter.patch('/', async (request, response) => {
  const { id } = request.params;
  const { nome } = request.body;

  const alterarCategoria = new AlterarCategoria();

  const categoria = await alterarCategoria.execute(id, nome);

  return response.json(categoria);
});

export default CategoriaRouter;
