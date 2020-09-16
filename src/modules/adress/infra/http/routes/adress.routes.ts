import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AdressController from '../controllers/AdressController';

const adressRouter = Router();
const adressController = new AdressController();

adressRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            adress: Joi.string().required(),
            value: Joi.number().required(),
        },
    }),
    adressController.create,
);

adressRouter.get('/', adressController.index);

adressRouter.patch(
    '/:adress_id',
    celebrate({
        [Segments.PARAMS]: {
            adress_id: Joi.required(),
        },
        [Segments.BODY]: {
            adress: Joi.string().required(),
            value: Joi.number().required(),
        },
    }),
    adressController.update,
);

adressRouter.delete(
    '/:adress_id',
    celebrate({
        [Segments.PARAMS]: {
            adress_id: Joi.required(),
        },
    }),
    adressController.remove,
);

export default adressRouter;
