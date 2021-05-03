import { Router } from 'express';

import transacaoRouter from './transacoes.routes';

const routes = Router();

routes.use('/transacao', transacaoRouter);

export default routes;
