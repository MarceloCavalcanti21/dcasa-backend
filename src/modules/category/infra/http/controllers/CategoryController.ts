import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryService from '@modules/category/services/CreateCategoryService';
import UpdateCategoryService from '@modules/category/services/UpdateCategoryService';
import ShowCategoryService from '@modules/category/services/ShowCategoryService';
import RemoveCategoryService from '@modules/category/services/RemoveCategoryService';

export default class CategoryController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title } = request.body;

        const createCategory = container.resolve(CreateCategoryService);

        const category = await createCategory.execute({
            title,
        });

        return response.json(classToClass(category));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { category_id } = request.params;
        const title = request.body;

        const updateCategory = container.resolve(UpdateCategoryService);

        const category = await updateCategory.execute(category_id, title);

        return response.json(classToClass(category));
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const list = container.resolve(ShowCategoryService);

        const category = await list.execute();

        return response.json(classToClass(category));
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { category_id } = request.params;

        const removeCategory = container.resolve(RemoveCategoryService);

        await removeCategory.execute(category_id);

        return response.json({ response: 'Categoria excluída com sucesso!' });
    }
}
