// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowForMotoboyService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(
        storeId: string,
        category_id: string,
    ): Promise<Delivery[]> {
        const delivery = await this.deliveryRepository.showForMotoboy(
            storeId,
            category_id,
        );

        if (!delivery) {
            throw new AppError('Nenhuma entrega em aberto no momento!');
        }

        return delivery;
    }
}

export default ShowForMotoboyService;
