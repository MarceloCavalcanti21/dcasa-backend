// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] Alterar o nome da entidade (tabela) que está sendo representada
// [x] Espeficiar os campos e seus respectivos tipos

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Adress from '@modules/adress/infra/typeorm/entities/Adress';

@Entity('deliveries')
class Delivery {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    adress_id: string;

    @ManyToOne(() => Adress)
    @JoinColumn({ name: 'adress_id' })
    adress: Adress;

    @Column()
    hour: number;

    @Column()
    minute: number;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    store: User;

    @Column()
    status: number;

    @Column()
    delay: number;

    @Column()
    motoboy_id: string;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Delivery;
