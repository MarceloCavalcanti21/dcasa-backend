import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAdressRepository from '../repositories/IAdressRepository';

import Adress from '../infra/typeorm/entities/Adress';

interface IRequest {
    adress: string;
    value: number;
}

@injectable()
class UpdateAdressService {
    constructor(
        @inject('AdressRepository')
        private adressRepository: IAdressRepository,
    ) {}

    public async execute(
        id: string,
        { adress, value }: IRequest,
    ): Promise<Adress> {
        const item = await this.adressRepository.findById(id);

        if (!item) {
            throw new AppError('Endereço não existe!');
        }

        item.adress = adress;
        item.value = value;

        return this.adressRepository.save(item);
    }
}

export default UpdateAdressService;
