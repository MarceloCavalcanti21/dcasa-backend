// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Implementar as funções adequadas de acordo com o repositório

import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICategoryRepository from '../repositories/ICategoryRepository';

import Category from '../infra/typeorm/entities/Category';

interface IRequest {
    id: string;
}

@injectable()
class RemoveCategoryService {
    constructor(
        @inject('CategoriesRepository')
        private categoryRepository: ICategoryRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(category_id: string): Promise<void> {
        await this.categoryRepository.remove(category_id);

        await this.cacheProvider.invalidate('category-list');
    }
}

export default RemoveCategoryService;
