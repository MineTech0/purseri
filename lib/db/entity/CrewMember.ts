import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Record } from './Record';
import { Ship } from './Ship';

@Entity()
export class CrewMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  firstName: string

  @Column('varchar')
  lastName: string

  @Column('varchar', { select: false, unique: true })
  socialSecurityNumber: string

  @Column('varchar')
  role: string

  @ManyToOne('Ship', 'crew')
  ship: Ship

  @OneToMany('Record', 'crewMember', {
    cascade: ['update','remove'],
  })
  records: Record[]
}
