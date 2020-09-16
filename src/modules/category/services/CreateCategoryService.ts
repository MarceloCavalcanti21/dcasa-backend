import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICategoryRepository from '../repositories/ICategoryRepository';

import Category from '../infra/typeorm/entities/Category';

interface IRequest {
    title: string;
}

@injectable()
class CreateCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ title }: IRequest): Promise<Category> {
        const category = await this.categoryRepository.create({
            title,
        });

        await this.cacheProvider.invalidate('category-list');

        return category;
    }
}

export default CreateCategoryService;
