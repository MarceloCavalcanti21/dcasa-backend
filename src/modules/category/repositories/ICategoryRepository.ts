import Category from '../infra/typeorm/entities/Category';
import ICreateCategory from '../dtos/ICreateCategoryDTO';

export default interface ICategoryRepository {
    create(data: ICreateCategory): Promise<Category>;
    save(category: Category): Promise<Category>;
    show(): Promise<Category[] | undefined>;
    findById(id: string): Promise<Category | undefined>;
    remove(category_id: string): Promise<void>;
}
