import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CrewMember } from './CrewMember'
import { Ship } from './Ship'

@Entity('records')
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  firstName: string

  @Column('varchar')
  lastName: string

  @Column('varchar', { select: false, default: null })
  socialSecurityNumber: string | null

  @Column('varchar')
  reason: string

  @Column('timestamptz')
  date: Date

  @Column('text')
  info: string

  @ManyToOne('Ship', 'records')
  ship: Ship

  @ManyToOne('CrewMember', 'records', {
    createForeignKeyConstraints: false,
  })
  crewMember: CrewMember
}
