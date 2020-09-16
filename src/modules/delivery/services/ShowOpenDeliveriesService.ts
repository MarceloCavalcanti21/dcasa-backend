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
class ShowDeliveriesForMotoboyService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(category_id: string): Promise<Delivery[]> {
        const delivery = await this.deliveryRepository.showOpenDeliveries(
            category_id,
        );

        if (!delivery) {
            throw new AppError('Nenhuma entrega em aberto no momento!');
        }

        return delivery;
    }
}

export default ShowDeliveriesForMotoboyService;
