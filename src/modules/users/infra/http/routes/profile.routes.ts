import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ensureAuthenticated, profileController.show);

profileRouter.put(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profileController.update,
);

profileRouter.patch(
    '/adminReset/:user_id',
    celebrate({
        [Segments.BODY]: {
            password: Joi.required(),
        },
    }),
    profileController.adminResetUserPassword,
);

export default profileRouter;
