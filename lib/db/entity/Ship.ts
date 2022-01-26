import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}
