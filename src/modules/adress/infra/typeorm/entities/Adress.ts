import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('adress')
class Adress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    adress: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Adress;
