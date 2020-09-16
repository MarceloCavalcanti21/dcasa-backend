// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    id: string;
}

@injectable()
class RemoveDeliveryService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        await this.deliveryRepository.remove(id);
    }
}

export default RemoveDeliveryService;
