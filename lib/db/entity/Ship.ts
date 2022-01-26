import { UserEntity } from './authEntities';
import { Record } from './Record';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('ships')
export class Ship {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column('name')
    name: string

    @Column('owner')
    owner: string

    @Column('shipmaster')
    shipmaster: string

    @OneToMany(() => Record, record => record.ship)
    records: Record[];

    @ManyToOne(() => UserEntity, user => user.ships)
    user: UserEntity;
}
