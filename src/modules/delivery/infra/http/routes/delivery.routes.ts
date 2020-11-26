// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Alterar os métodos

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DeliveryController from '../controllers/DeliveryController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const deliveryRouter = Router();
const deliveryController = new DeliveryController();

deliveryRouter.use(ensureAuthenticated);

deliveryRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            adress_id: Joi.string().required(),
            hour: Joi.required(),
            minute: Joi.required(),
            status: Joi.number().required(),
            delay: Joi.number().required(),
            category_id: Joi.string().required(),
        },
    }),
    deliveryController.create,
);

deliveryRouter.patch(
    '/delay/:delivery_id',
    celebrate({
        [Segments.PARAMS]: {
            delivery_id: Joi.required(),
        },
        [Segments.BODY]: {
            delay: Joi.required(),
        },
    }),
    deliveryController.delayChange,
);

deliveryRouter.patch(
    '/accept/:delivery_id',
    celebrate({
        [Segments.PARAMS]: {
            delivery_id: Joi.required(),
        },
    }),
    deliveryController.acceptDelivery,
);

deliveryRouter.get(
    '/mine',
    celebrate({
        [Segments.BODY]: {
            user_id: Joi.required(),
        },
    }),
    deliveryController.indexMine,
);

// Administrador
deliveryRouter.get('/sum/:store_id', deliveryController.sumDebts);
deliveryRouter.get('/list/:store_id', deliveryController.listDebts);

// Estabelecimento
deliveryRouter.get('/sumMine', deliveryController.sumMineDebts);
deliveryRouter.get('/listMine', deliveryController.listMineDebts);

deliveryRouter.get(
    '/accepted/me/:category_id',
    deliveryController.showOpenDeliveries,
);

// Lista somente estabelecimentos com entregas ativas no Dashboard do motoboy
deliveryRouter.get(
    '/accepted/me/actives/:category_id',
    deliveryController.listActiveStores,
);

// Dashboard motoboy atualizado com Scroll View
deliveryRouter.get(
    '/accepted/me/:storeId/:category_id',
    deliveryController.showForMotoboy,
);

// Dashboard do ADMIN: listagem das lojas ativas no dia selecionado
deliveryRouter.get(
    '/showAllToday',
    deliveryController.listActiveStoresForAdmin,
);

// Dashboard do ADMIN
deliveryRouter.get('/showAllToday/:storeId', deliveryController.showAllToday);

deliveryRouter.get(
    '/accepted/mines',
    deliveryController.showMineAcceptedDeliveries,
);

deliveryRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    deliveryController.remove,
);

deliveryRouter.delete(
    '/store/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    deliveryController.removeForStore,
);

export default deliveryRouter;
