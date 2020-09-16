// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowMineAcceptedDeliveriesService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<Delivery[]> {
        const delivery = await this.deliveryRepository.showMineAcceptedDeliveries(
            user_id,
        );

        return delivery;
    }
}

export default ShowMineAcceptedDeliveriesService;
