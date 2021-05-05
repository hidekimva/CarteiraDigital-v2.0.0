import { Router } from 'express';

import transacaoRouter from './transacoes.routes';
import categoriaRouter from './categorias.routes';
import usuarioRouter from './usuarios.routes';
import sessaoRouter from './sessoes.routes';

const routes = Router();

routes.use('/transacao', transacaoRouter);
routes.use('/categorias', categoriaRouter);
routes.use('/usuario', usuarioRouter);
routes.use('/sessao', sessaoRouter);

export default routes;
