// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    delay: number;
}

@injectable()
class UpdateDelayService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute(id: string, { delay }: IRequest): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findById(id);

        if (!delivery) {
            throw new AppError('Entrega não existe!');
        }

        delivery.delay = delay;

        return this.deliveryRepository.save(delivery);
    }
}

export default UpdateDelayService;
