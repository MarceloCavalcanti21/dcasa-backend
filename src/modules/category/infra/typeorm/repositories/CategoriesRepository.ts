import { getRepository, Repository } from 'typeorm';

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/category/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoryRepository {
    private ormRepository: Repository<Category>;

    constructor() {
        this.ormRepository = getRepository(Category);
    }

    public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
        const newCategory = this.ormRepository.create(categoryData);

        await this.ormRepository.save(newCategory);

        return newCategory;
    }

    public async save(category: Category): Promise<Category> {
        return this.ormRepository.save(category);
    }

    public async show(): Promise<Category[] | undefined> {
        const category = this.ormRepository.find();

        return category;
    }

    public async findById(id: string): Promise<Category | undefined> {
        const category = await this.ormRepository.findOne(id);

        return category;
    }

    public async remove(category_id: string): Promise<void> {
        await this.ormRepository.delete(category_id);
    }
}

export default CategoriesRepository;
