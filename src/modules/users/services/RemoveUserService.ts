import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(user_id: string): Promise<void> {
        await this.usersRepository.remove(user_id);

        await this.cacheProvider.invalidate('users-list:admin');
    }
}

export default UpdateProfileService;
