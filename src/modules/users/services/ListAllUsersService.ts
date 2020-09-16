import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

@injectable()
class ListAllUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `users-list:admin`,
        );

        if (!users) {
            users = await this.usersRepository.findAll();

            // await this.cacheProvider.save(`users-list:admin`, users);
        }

        return users;
    }
}

export default ListAllUsersService;
