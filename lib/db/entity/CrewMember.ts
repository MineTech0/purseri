import {Column, Entity} from "typeorm";

@Entity()
export class CrewMember {
    @Column('varchar')
    firstName : string

    @Column('varchar')
    lastName : string

    @Column('varchar')
    socialSecurityNumber: string

    @Column('varchar')
    role: string

}
