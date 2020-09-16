import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAdressRepository from '../repositories/IAdressRepository';

import Adress from '../infra/typeorm/entities/Adress';

@injectable()
class ShowAdressService {
    constructor(
        @inject('AdressRepository')
        private adressRepository: IAdressRepository,
    ) {}

    public async execute(): Promise<Adress[] | undefined> {
        const item = await this.adressRepository.show();

        if (!item) {
            throw new AppError('Nenhum endereço cadastrada!');
        }

        return item;
    }
}

export default ShowAdressService;
