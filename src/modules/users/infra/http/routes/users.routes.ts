import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            doc: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            type: Joi.string().required(),
            category_id: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.get('/', usersController.index);

usersRouter.delete(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().required(),
        },
    }),
    usersController.remove,
);

usersRouter.put('/:user_id', usersController.update);

export default usersRouter;
