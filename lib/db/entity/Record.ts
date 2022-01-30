
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { CrewMember } from "./CrewMember";
import { Ship } from "./Ship";

@Entity('records')
export class Record {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column('varchar')
    firstName : string

    @Column('varchar')
    lastName : string

    @Column('varchar')
    reason: string

    @Column('timestamptz')
    date: Date

    @Column('text')
    info: string

    @ManyToOne(() => Ship, ship => ship.records)
    ship: Ship;

    @ManyToOne(() => CrewMember, member => member.records)
    crewMember: CrewMember;
}
