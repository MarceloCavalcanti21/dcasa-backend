// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAdressRepository from '../repositories/IAdressRepository';

import Adress from '../infra/typeorm/entities/Adress';

@injectable()
class RemoveAdressService {
    constructor(
        @inject('AdressRepository')
        private adressRepository: IAdressRepository,
    ) {}

    public async execute(adress_id: string): Promise<void> {
        await this.adressRepository.remove(adress_id);
    }
}

export default RemoveAdressService;
