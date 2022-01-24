import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}
