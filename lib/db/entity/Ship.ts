import { Record } from './Record';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from './entities';

@Entity('ships')
export class Ship {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('varchar')
    name: string

    @Column('varchar')
    owner: string

    @Column('varchar')
    shipmaster: string

    @OneToMany(() => Record, record => record.ship)
    records: Record[];

    @ManyToOne(() => UserEntity, user => user.ships)
    user: UserEntity;
}
