import { injectable, inject } from 'tsyringe';

// import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    // user_id: string;
    name: string;
    doc: string;
    phone: string;
    email: string;
    type: string;
    category_id: string;
}

@injectable()
class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(
        user_id: string,
        { name, doc, phone, email, type, category_id }: IRequest,
    ): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userEmail = await this.usersRepository.findByEmail(email);

        if (userEmail && userEmail.id !== user_id) {
            throw new AppError(
                'Esse e-mail já está sendo utilizado por outro usuário',
            );
        }

        user.name = name;
        user.doc = doc;
        user.phone = phone;
        user.email = email;
        user.type = type;
        user.category_id = category_id;

        await this.cacheProvider.invalidate('users-list:admin');

        return this.usersRepository.save(user);
    }
}

export default UpdateUserService;
