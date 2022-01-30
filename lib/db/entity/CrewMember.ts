import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import { Record } from "./Record";
import { Ship } from "./Ship";

@Entity()
export class CrewMember {
    @PrimaryColumn('uuid')
    id:string

    @Column('varchar')
    firstName : string

    @Column('varchar')
    lastName : string

    @Column('varchar')
    socialSecurityNumber: string

    @Column('varchar')
    role: string

    @ManyToOne(() => Ship, ship => ship.crew)
    ship: Ship;

    @OneToMany(() => Record, record => record.crewMember)
    records: Record[];

}
