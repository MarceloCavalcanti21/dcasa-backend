// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    adress_id: string;
    hour: number;
    minute: number;
    user_id: string;
    status: number;
    delay: number;
    motoboy_id?: string;
    category_id: string;
}

@injectable()
class CreateDeliveryService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute({
        adress_id,
        hour,
        minute,
        user_id,
        status,
        delay,
        motoboy_id,
        category_id,
    }: IRequest): Promise<Delivery> {
        const delivery = await this.deliveryRepository.create({
            adress_id,
            hour,
            minute,
            user_id,
            status,
            delay,
            motoboy_id,
            category_id,
        });

        return delivery;
    }
}

export default CreateDeliveryService;
