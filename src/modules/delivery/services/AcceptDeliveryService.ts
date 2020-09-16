// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    motoboy_id: string;
}

@injectable()
class AcceptDeliveryService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(
        id: string,
        status: number,
        motoboy_id: string,
    ): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findById(id);

        if (!delivery) {
            throw new AppError('Entrega não existe!');
        }

        if (delivery.status > 0) {
            throw new AppError('Esta entrega já foi aceita');
        }

        delivery.motoboy_id = motoboy_id;
        delivery.status = status;

        return this.deliveryRepository.save(delivery);
    }
}

export default AcceptDeliveryService;
