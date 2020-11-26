// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

// import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    id: string;
}

@injectable()
class RemoveDeliveryForStoreService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const delivery = await this.deliveryRepository.findById(id);

        if (!delivery) {
            throw new AppError('Entrega não existe!');
        }

        if (delivery.status > 0) {
            throw new AppError('Esta entrega já foi aceita');
        }

        await this.deliveryRepository.remove(id);
    }
}

export default RemoveDeliveryForStoreService;
