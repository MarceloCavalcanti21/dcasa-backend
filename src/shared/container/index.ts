// [x] Importar a interface do repositório e o próprio repositório
// [x] Fazer o registro de ambos

import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import CategoriesRepository from '@modules/category/infra/typeorm/repositories/CategoriesRepository';

import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import DeliveryRepository from '@modules/delivery/infra/typeorm/repositories/DeliveryRepository';

import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import AdressRepository from '@modules/adress/infra/typeorm/repositories/AdressRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);

container.registerSingleton<ICategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository,
);

container.registerSingleton<IDeliveryRepository>(
    'DeliveryRepository',
    DeliveryRepository,
);

container.registerSingleton<IAdressRepository>(
    'AdressRepository',
    AdressRepository,
);
