import { getRepository, Repository } from 'typeorm';

import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import ICreateAdressDTO from '@modules/adress/dtos/ICreateAdressDTO';

import Adress from '../entities/Adress';

class AdressRepository implements IAdressRepository {
    private ormRepository: Repository<Adress>;

    constructor() {
        this.ormRepository = getRepository(Adress);
    }

    public async create(adressData: ICreateAdressDTO): Promise<Adress> {
        const newItem = this.ormRepository.create(adressData);

        await this.ormRepository.save(newItem);

        return newItem;
    }

    public async save(adress: Adress): Promise<Adress> {
        return this.ormRepository.save(adress);
    }

    public async show(): Promise<Adress[] | undefined> {
        const item = this.ormRepository.find();

        return item;
    }

    public async findById(id: string): Promise<Adress | undefined> {
        const item = await this.ormRepository.findOne(id);

        return item;
    }

    public async remove(adress_id: string): Promise<void> {
        await this.ormRepository.delete(adress_id);
    }
}

export default AdressRepository;
