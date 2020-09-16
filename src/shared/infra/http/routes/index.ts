// [] Importar o arquivo de rotas do seu devido escopo
// []Eespecificar a sua URL padrão

import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import categoriesRouter from '@modules/category/infra/http/routes/category.routes';
import deliveryRouter from '@modules/delivery/infra/http/routes/delivery.routes';
import adressRouter from '@modules/adress/infra/http/routes/adress.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/categories', categoriesRouter);
routes.use('/delivery', deliveryRouter);
routes.use('/adress', adressRouter);

export default routes;
