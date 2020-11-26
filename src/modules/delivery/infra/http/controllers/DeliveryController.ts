// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDeliveryService from '@modules/delivery/services/CreateDeliveryService';
import RemoveDeliveryService from '@modules/delivery/services/RemoveDeliveryService';
import RemoveDeliveryForStoreService from '@modules/delivery/services/RemoveDeliveryForStoreService';
import ListMineDebtsService from '@modules/delivery/services/ListMineDebtsService';
import ListDebtsService from '@modules/delivery/services/ListDebtsService';
import SumMineDebtsService from '@modules/delivery/services/SumMineDebtsService';
import SumDebtsService from '@modules/delivery/services/SumDebtsService';
import ListMineDeliveriesService from '@modules/delivery/services/ListMineDeliveriesService';
import UpdateDelayService from '@modules/delivery/services/UpdateDelayService';
import AcceptDeliveryService from '@modules/delivery/services/AcceptDeliveryService';
import ShowOpenDeliveriesService from '@modules/delivery/services/ShowOpenDeliveriesService';
import ListActiveStoresService from '@modules/delivery/services/ListActiveStoresService';
import ShowForMotoboyService from '@modules/delivery/services/ShowForMotoboyService';
import ShowMineAcceptedDeliveriesService from '@modules/delivery/services/ShowMineAcceptedDeliveriesService';
import ListActiveStoresForAdminService from '@modules/delivery/services/ListActiveStoresForAdminService';
import ShowAllTodayService from '@modules/delivery/services/ShowAllTodayService';

export default class DeliveryController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const {
            adress_id,
            hour,
            minute,
            status,
            delay,
            motoboy_id,
            category_id,
        } = request.body;

        const createDelivery = container.resolve(CreateDeliveryService);

        const delivery = await createDelivery.execute({
            adress_id,
            hour,
            minute,
            user_id,
            status,
            delay,
            motoboy_id,
            category_id,
        });

        await request.io.emit('new', 'Nova entrega solicitada');

        return response.json(classToClass(delivery));
    }

    public async delayChange(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { delivery_id } = request.params;

        const delay = request.body;

        const update = container.resolve(UpdateDelayService);

        const delivery = await update.execute(delivery_id, delay);

        await request.io.emit('delay', 'Atraso informado');

        return response.json(classToClass(delivery));
    }

    // ESTABELECIMENTO
    public async removeForStore(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const removeDelivery = container.resolve(RemoveDeliveryForStoreService);

        await removeDelivery.execute(id);

        return response.json({ response: 'Entrega excluída com sucesso!' });
    }

    // ADMIN
    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const removeDelivery = container.resolve(RemoveDeliveryService);

        await removeDelivery.execute(id);

        return response.json({ response: 'Entrega excluída com sucesso!' });
    }

    public async indexMine(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;

        const list = container.resolve(ListMineDeliveriesService);

        const listDeliveries = await list.execute({
            user_id,
        });

        return response.json(classToClass(listDeliveries));
    }

    public async showAllToday(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { storeId } = request.params;
        const { day, month, year } = request.query;

        const showAllToday = container.resolve(ShowAllTodayService);

        const payValue = await showAllToday.execute({
            storeId,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(classToClass(payValue));
    }

    public async listActiveStoresForAdmin(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { day, month, year } = request.query;

        const listActiveStoresForAdmin = container.resolve(
            ListActiveStoresForAdminService,
        );

        const payValue = await listActiveStoresForAdmin.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(classToClass(payValue));
    }

    public async sumDebts(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { store_id } = request.params;
        const {
            inicial_day,
            inicial_month,
            inicial_year,
            final_day,
            final_month,
            final_year,
        } = request.query;

        const sumDebts = container.resolve(SumDebtsService);

        const payValue = await sumDebts.execute({
            store_id,
            inicial_day: Number(inicial_day),
            inicial_month: Number(inicial_month),
            inicial_year: Number(inicial_year),
            final_day: Number(final_day),
            final_month: Number(final_month),
            final_year: Number(final_year),
        });

        return response.json(classToClass(payValue));
    }

    public async listDebts(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { store_id } = request.params;
        const {
            inicial_day,
            inicial_month,
            inicial_year,
            final_day,
            final_month,
            final_year,
        } = request.query;

        const listDebts = container.resolve(ListDebtsService);

        const payValue = await listDebts.execute({
            store_id,
            inicial_day: Number(inicial_day),
            inicial_month: Number(inicial_month),
            inicial_year: Number(inicial_year),
            final_day: Number(final_day),
            final_month: Number(final_month),
            final_year: Number(final_year),
        });

        return response.json(classToClass(payValue));
    }

    public async sumMineDebts(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const {
            inicial_day,
            inicial_month,
            inicial_year,
            final_day,
            final_month,
            final_year,
        } = request.query;

        const sumDebts = container.resolve(SumMineDebtsService);

        const payValue = await sumDebts.execute({
            user_id,
            inicial_day: Number(inicial_day),
            inicial_month: Number(inicial_month),
            inicial_year: Number(inicial_year),
            final_day: Number(final_day),
            final_month: Number(final_month),
            final_year: Number(final_year),
        });

        return response.json(classToClass(payValue));
    }

    public async listMineDebts(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const {
            inicial_day,
            inicial_month,
            inicial_year,
            final_day,
            final_month,
            final_year,
        } = request.query;

        const listDebts = container.resolve(ListMineDebtsService);

        const payValue = await listDebts.execute({
            user_id,
            inicial_day: Number(inicial_day),
            inicial_month: Number(inicial_month),
            inicial_year: Number(inicial_year),
            final_day: Number(final_day),
            final_month: Number(final_month),
            final_year: Number(final_year),
        });

        return response.json(classToClass(payValue));
    }

    public async acceptDelivery(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { delivery_id } = request.params;
        const motoboy_id = request.user.id;
        const status = 1;

        const accept = container.resolve(AcceptDeliveryService);

        const delivery = await accept.execute(delivery_id, status, motoboy_id);

        await request.io.emit('accept', 'Nova entrega aceita');

        return response.json(classToClass(delivery));
    }

    public async showOpenDeliveries(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // const user_id = request.user.id;
        const { category_id } = request.params;

        const list = container.resolve(ShowOpenDeliveriesService);

        const listDeliveries = await list.execute(category_id);

        return response.json(classToClass(listDeliveries));
    }

    public async showForMotoboy(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { storeId, category_id } = request.params;

        const list = container.resolve(ShowForMotoboyService);

        const listDeliveries = await list.execute(storeId, category_id);

        return response.json(classToClass(listDeliveries));
    }

    public async listActiveStores(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { category_id } = request.params;

        const list = container.resolve(ListActiveStoresService);

        const listDeliveries = await list.execute(category_id);

        return response.json(classToClass(listDeliveries));
    }

    public async showMineAcceptedDeliveries(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        // const motoboy_id = request.user.id;
        // const motoboy_id = user_id;

        const list = container.resolve(ShowMineAcceptedDeliveriesService);

        const listDeliveries = await list.execute({
            user_id,
        });

        return response.json(classToClass(listDeliveries));
    }
}
