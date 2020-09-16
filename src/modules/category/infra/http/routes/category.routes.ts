import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CategoryController from '../controllers/CategoryController';

const categoriesRouter = Router();
const categoriesController = new CategoryController();

categoriesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
        },
    }),
    categoriesController.create,
);

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.patch(
    '/:category_id',
    celebrate({
        [Segments.PARAMS]: {
            category_id: Joi.required(),
        },
        [Segments.BODY]: {
            title: Joi.string().required(),
        },
    }),
    categoriesController.update,
);

categoriesRouter.delete(
    '/:category_id',
    celebrate({
        [Segments.PARAMS]: {
            category_id: Joi.required(),
        },
    }),
    categoriesController.remove,
);

export default categoriesRouter;
