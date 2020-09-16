import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICategoryRepository from '../repositories/ICategoryRepository';

import Category from '../infra/typeorm/entities/Category';

@injectable()
class ShowCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Category[] | undefined> {
        let category = await this.cacheProvider.recover<Category[] | undefined>(
            `category-list`,
        );

        if (!category) {
            category = await this.categoryRepository.show();

            if (!category) {
                throw new AppError('Nenhuma categoria cadastrada!');
            }

            // await this.cacheProvider.save(`category-list`, category);
        }

        return category;
    }
}

export default ShowCategoryService;
