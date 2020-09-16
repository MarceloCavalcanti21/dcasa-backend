import Adress from '../infra/typeorm/entities/Adress';
import ICreateAdressDTO from '../dtos/ICreateAdressDTO';

export default interface IAdressRepository {
    create(data: ICreateAdressDTO): Promise<Adress>;
    save(adress: Adress): Promise<Adress>;
    show(): Promise<Adress[] | undefined>;
    findById(id: string): Promise<Adress | undefined>;
    remove(adress_id: string): Promise<void>;
}
