// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListActiveStoresForAdminService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute({ day, month, year }: IRequest): Promise<Delivery[]> {
        const delivery = await this.deliveryRepository.listActiveStoresForAdmin(
            {
                day,
                month,
                year,
            },
        );

        if (!delivery) {
            throw new AppError(
                'Não foram feitas entregas no período selecionado',
            );
        }

        return delivery;
    }
}

export default ListActiveStoresForAdminService;
