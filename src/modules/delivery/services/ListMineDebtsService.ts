// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequest {
    user_id: string;
    inicial_day: number;
    inicial_month: number;
    inicial_year: number;
    final_day: number;
    final_month: number;
    final_year: number;
}

@injectable()
class ListMineDebtsService {
    constructor(
        @inject('DeliveryRepository')
        private deliveryRepository: IDeliveryRepository,
    ) {}

    public async execute({
        user_id,
        inicial_day,
        inicial_month,
        inicial_year,
        final_day,
        final_month,
        final_year,
    }: IRequest): Promise<Delivery[]> {
        const delivery = await this.deliveryRepository.listMineDebts({
            user_id,
            inicial_day,
            inicial_month,
            inicial_year,
            final_day,
            final_month,
            final_year,
        });

        if (!delivery) {
            throw new AppError(
                'Não foram feitas entregas no período selecionado',
            );
        }

        return delivery;
    }
}

export default ListMineDebtsService;
