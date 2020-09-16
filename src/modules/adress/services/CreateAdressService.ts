import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAdressRepository from '../repositories/IAdressRepository';

import Adress from '../infra/typeorm/entities/Adress';

interface IRequest {
    adress: string;
    value: number;
}

@injectable()
class CreateAdressService {
    constructor(
        @inject('AdressRepository')
        private adressRepository: IAdressRepository,
    ) {}

    public async execute({ adress, value }: IRequest): Promise<Adress> {
        const item = await this.adressRepository.create({
            adress,
            value,
        });

        return item;
    }
}

export default CreateAdressService;
