// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com a interface do repositório

import { getRepository, Repository, Between, Raw } from 'typeorm';

import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import ICreateDeliveryDTO from '@modules/delivery/dtos/ICreateDeliveryDTO';
import IListDeliveryDTO from '@modules/delivery/dtos/IListDeliveryDTO';
import IListMineDeliveryDTO from '@modules/delivery/dtos/IListMineDeliveryDTO';
import IListActiveStoresForAdminDTO from '@modules/delivery/dtos/IListActiveStoresForAdminDTO';
import IShowAllTodayDTO from '@modules/delivery/dtos/IShowAllTodayDTO';

import Delivery from '../entities/Delivery';

class DeliveryRepository implements IDeliveryRepository {
    private ormRepository: Repository<Delivery>;

    constructor() {
        this.ormRepository = getRepository(Delivery);
    }

    public async create(deliveryData: ICreateDeliveryDTO): Promise<Delivery> {
        const item = this.ormRepository.create(deliveryData);

        await this.ormRepository.save(item);

        return item;
    }

    public async findById(id: string): Promise<Delivery | undefined> {
        const delivery = await this.ormRepository.findOne(id);

        return delivery;
    }

    public async save(delivery: Delivery): Promise<Delivery> {
        return this.ormRepository.save(delivery);
    }

    public async remove(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    // Para o dashboard do administrador
    public async showAllToday({
        storeId,
        day,
        month,
        year,
    }: IShowAllTodayDTO): Promise<Delivery[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const history = await this.ormRepository.find({
            where: {
                created_at: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}'`,
                ),
                user_id: Raw(
                    dateFieldName => `${dateFieldName} = '${storeId}'`,
                ),
            },
            relations: ['store', 'adress'],
        });

        // const history = await this.ormRepository.manager.query(
        //     `SELECT id, to_char(created_at, 'DD-MM-YYYY'), value FROM delivery WHERE user_id = '${store_id}' AND to_char(created_at, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}'`,
        // );

        return history;
    }

    // Para o Dashboard do estabelecimento
    public async showMine(user_id: string): Promise<Delivery[]> {
        const deliveries = await this.ormRepository.find({
            where: {
                user_id,
                status: Raw(dateFieldName => `${dateFieldName} = 0`),
            },
            relations: ['adress'],
        });

        return deliveries;
    }

    // Para o Dashboard do motoboy
    public async showOpenDeliveries(
        category_id: string,
    ): Promise<Delivery[] | undefined> {
        const deliveries = await this.ormRepository.find({
            where: {
                status: 0,
                category_id: Raw(
                    dateFieldName => `${dateFieldName} = '${category_id}'`,
                ),
            },
            relations: ['store', 'adress'],
        });

        // const deliveries = await this.ormRepository.manager.query(
        //     `SELECT * FROM delivery WHERE status = 0`,
        // );

        return deliveries;
    }

    // TESTE: para o Dashboard do motoboy
    public async showForMotoboy(
        storeId: string,
        category_id: string,
    ): Promise<Delivery[] | undefined> {
        const deliveries = await this.ormRepository.find({
            where: {
                status: 0,
                user_id: Raw(
                    dateFieldName => `${dateFieldName} = '${storeId}'`,
                ),
                category_id: Raw(
                    dateFieldName => `${dateFieldName} = '${category_id}'`,
                ),
            },
            relations: ['store', 'adress'],
        });

        // const deliveries = await this.ormRepository.manager.query(
        //     `SELECT * FROM delivery WHERE status = 0`,
        // );

        return deliveries;
    }

    // Lista os estabelecimentos com entregas em aberto para o MOTOBOY
    public async listActiveStores(
        category_id: string,
    ): Promise<Delivery[] | undefined> {
        // const deliveries = await this.ormRepository.find({
        //     where: {
        //         status: 0,
        //         category_id: Raw(
        //             dateFieldName => `${dateFieldName} = '${category_id}'`,
        //         ),
        //     },
        //     relations: ['store', 'adress'],
        // });

        const deliveries = await this.ormRepository.manager.query(
            `SELECT DISTINCT user_id, users.name FROM deliveries INNER JOIN users ON deliveries.user_id = users.id WHERE status = 0 AND deliveries.category_id = '${category_id}' ORDER BY users.name ASC`,
        );

        return deliveries;
    }

    // Lista os estabelecimentos com entregas em aberto para o ADMIN
    public async listActiveStoresForAdmin({
        day,
        month,
        year,
    }: IListActiveStoresForAdminDTO): Promise<Delivery[] | undefined> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const deliveries = await this.ormRepository.manager.query(
            `SELECT DISTINCT user_id, users.name FROM deliveries INNER JOIN users ON deliveries.user_id = users.id WHERE to_char(deliveries.created_at, 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}' ORDER BY users.name ASC`,
        );

        return deliveries;
    }

    // Para a lista de entregas aceitas pelo motoboy
    public async showMineAcceptedDeliveries(
        user_id: string,
    ): Promise<Delivery[]> {
        const deliveries = await this.ormRepository.find({
            where: {
                motoboy_id: Raw(
                    dateFieldName => `${dateFieldName} = '${user_id}'`,
                ),
            },
            relations: ['store', 'adress'],
        });

        return deliveries;
    }

    // Para relatório de faturamento do administrador
    public async sumDebts({
        store_id,
        inicial_day,
        inicial_month,
        inicial_year,
        final_day,
        final_month,
        final_year,
    }: IListDeliveryDTO): Promise<Delivery[]> {
        const parsedInicialDay = String(inicial_day).padStart(2, '0');
        const parsedInicialMonth = String(inicial_month).padStart(2, '0');

        const parsedFinalDay = String(final_day).padStart(2, '0');
        const parsedFinalMonth = String(final_month).padStart(2, '0');
        // const history = await this.ormRepository.find({
        //     where: {
        //         user_id,
        //         created_at: Between(inicial_date, final_date),
        //     },
        // });

        // const history = await this.ormRepository.find({
        //     where: {
        //         store_id,
        //         created_at: Raw(
        //             dateFieldName =>
        //                 `to_char(${dateFieldName}, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}'`,
        //         ),
        //     },
        // });

        const history = await this.ormRepository.manager.query(
            `SELECT user_id, SUM(adress.value) FROM deliveries INNER JOIN adress ON deliveries.adress_id = adress.id WHERE user_id = '${store_id}' AND status = 1 AND to_char(deliveries.created_at, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}' GROUP BY user_id`,
        );

        return history;
    }

    // Para relatório de faturamento do administrador
    public async listDebts({
        store_id,
        inicial_day,
        inicial_month,
        inicial_year,
        final_day,
        final_month,
        final_year,
    }: IListDeliveryDTO): Promise<Delivery[]> {
        const parsedInicialDay = String(inicial_day).padStart(2, '0');
        const parsedInicialMonth = String(inicial_month).padStart(2, '0');

        const parsedFinalDay = String(final_day).padStart(2, '0');
        const parsedFinalMonth = String(final_month).padStart(2, '0');

        // const history = await this.ormRepository.find({
        //     where: {
        //         store_id,
        //         created_at: Raw(
        //             dateFieldName =>
        //                 `to_char(${dateFieldName}, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}'`,
        //         ),
        //     },
        // });

        const history = await this.ormRepository.manager.query(
            `SELECT deliveries.id, to_char(deliveries.created_at, 'DD-MM-YYYY'), adress.value FROM deliveries INNER JOIN adress ON deliveries.adress_id = adress.id WHERE user_id = '${store_id}' AND status = 1 AND to_char(deliveries.created_at, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}' ORDER BY deliveries.created_at ASC`,
        );

        return history;
    }

    // Para relatório de faturamento do estabelecimento
    public async sumMineDebts({
        user_id,
        inicial_day,
        inicial_month,
        inicial_year,
        final_day,
        final_month,
        final_year,
    }: IListMineDeliveryDTO): Promise<Delivery[]> {
        const parsedInicialDay = String(inicial_day).padStart(2, '0');
        const parsedInicialMonth = String(inicial_month).padStart(2, '0');

        const parsedFinalDay = String(final_day).padStart(2, '0');
        const parsedFinalMonth = String(final_month).padStart(2, '0');

        const history = await this.ormRepository.manager.query(
            `SELECT user_id, SUM(adress.value) FROM deliveries INNER JOIN adress ON deliveries.adress_id = adress.id WHERE user_id = '${user_id}' AND to_char(deliveries.created_at, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}' GROUP BY user_id`,
        );

        return history;
    }

    // Para relatório de faturamento do estabelecimento
    public async listMineDebts({
        user_id,
        inicial_day,
        inicial_month,
        inicial_year,
        final_day,
        final_month,
        final_year,
    }: IListMineDeliveryDTO): Promise<Delivery[]> {
        const parsedInicialDay = String(inicial_day).padStart(2, '0');
        const parsedInicialMonth = String(inicial_month).padStart(2, '0');

        const parsedFinalDay = String(final_day).padStart(2, '0');
        const parsedFinalMonth = String(final_month).padStart(2, '0');

        const history = await this.ormRepository.manager.query(
            `SELECT deliveries.id, to_char(deliveries.created_at, 'DD-MM-YYYY'), adress.value FROM deliveries INNER JOIN adress ON deliveries.adress_id = adress.id WHERE user_id = '${user_id}' AND to_char(deliveries.created_at, 'YYYY-MM-DD') BETWEEN '${inicial_year}-${parsedInicialMonth}-${parsedInicialDay}' AND '${final_year}-${parsedFinalMonth}-${parsedFinalDay}' ORDER BY deliveries.created_at ASC`,
        );

        return history;
    }
}

export default DeliveryRepository;
