import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAdressService from '@modules/adress/services/CreateAdressService';
import UpdateAdressService from '@modules/adress/services/UpdateAdressService';
import ShowAdressService from '@modules/adress/services/ShowAdressService';
import RemoveAdressService from '@modules/adress/services/RemoveAdressService';

export default class AdressController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { adress, value } = request.body;

        const create = container.resolve(CreateAdressService);

        const category = await create.execute({
            adress,
            value,
        });

        return response.json(classToClass(category));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { adress_id } = request.params;
        const { adress, value } = request.body;

        const update = container.resolve(UpdateAdressService);

        const item = await update.execute(adress_id, { adress, value });

        return response.json(classToClass(item));
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const list = container.resolve(ShowAdressService);

        const item = await list.execute();

        return response.json(classToClass(item));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { adress_id } = request.params;

        const remove = container.resolve(RemoveAdressService);

        await remove.execute(adress_id);

        return response.json({ response: 'Endereço excluído com sucesso!' });
    }
}
