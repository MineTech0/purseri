import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Ship } from "./Ship";

@Entity('records')
export class Record {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column('varchar')
    name: string

    @Column('varchar')
    reason: string

    @Column('timestamptz')
    date: Date

    @Column('text')
    info: string

    @ManyToOne(() => Ship, ship => ship.records)
    ship: Ship;
}
