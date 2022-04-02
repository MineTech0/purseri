import { Record } from './Record';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { UserEntity } from './entities';
import { CrewMember } from './CrewMember';

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

    @Column('varchar')
    idLetters: string

    @Column('varchar')
    imo: string

    @Column('int')
    gt: number

    @Column('int')
    power: number

    @Column('decimal')
    length: number

    @Column('varchar')
    nationality: string

    @Column('varchar')
    home: string

    @Column('varchar')
    address: string

    @Column('int')
    area: number

    @OneToMany('Record', 'ship')
    records: Record[];

    @OneToMany('CrewMember', 'ship')
    crew: CrewMember[];

    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
