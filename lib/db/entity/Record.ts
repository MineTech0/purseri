import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('records')
export class Record {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name: string

    @Column()
    reason: string

    @Column('date')
    date: Date

    @Column('text')
    info: string
}
