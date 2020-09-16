import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICategoryRepository from '../repositories/ICategoryRepository';

import Category from '../infra/typeorm/entities/Category';

interface IRequest {
    title: string;
}

@injectable()
class UpdateCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(id: string, { title }: IRequest): Promise<Category> {
        const category = await this.categoryRepository.findById(id);

        if (!category) {
            throw new AppError('Categoria não existe!');
        }

        category.title = title;

        await this.cacheProvider.invalidate('category-list');

        return this.categoryRepository.save(category);
    }
}

export default UpdateCategoryService;
