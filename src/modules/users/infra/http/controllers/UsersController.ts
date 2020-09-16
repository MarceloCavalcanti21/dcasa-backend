import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import RemoveUserService from '@modules/users/services/RemoveUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            doc,
            phone,
            email,
            password,
            type,
            category_id,
        } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            doc,
            phone,
            email,
            password,
            type,
            category_id,
        });

        return response.json(classToClass(user));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;

        const removeUser = container.resolve(RemoveUserService);

        await removeUser.execute(user_id);

        return response.json({ response: 'Usuário excluído com sucesso!' });
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const list = container.resolve(ListAllUsersService);

        const users = await list.execute();

        return response.json(classToClass(users));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { user_id } = request.params;
        const { name, doc, phone, email, type, category_id } = request.body;

        const updateUser = container.resolve(UpdateUserService);

        const user = await updateUser.execute(user_id, {
            name,
            doc,
            phone,
            email,
            type,
            category_id,
        });

        return response.json(classToClass(user));
    }
}
