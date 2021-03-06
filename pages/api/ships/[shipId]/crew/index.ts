import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Ship } from '../../../../../lib/db/entity/Ship'
import { getConn } from '../../../../../lib/db/connection'
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'
import { Record } from '../../../../../lib/db/entity/Record'
import { convertBirthDateToString } from 'lib/utils'
import apiAuth from 'lib/utils/apiAuth'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CrewMember | CrewMember[] | ValidationError[] | { name: string; count: number }
  >
) {
  const { shipId, firstName, lastName, birthDate } = req.query
  const conn = await getConn()
  const crewMemberRepo = conn.getRepository(CrewMember)
  const shipRepo = conn.getRepository(Ship)
  const recordRepo = conn.getRepository(Record)

  switch (req.method) {
    case 'GET':
      return getShipCrew()
    case 'POST':
      return createShipCrewMember()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShipCrew() {
    if(firstName && lastName && birthDate){
      const records = await crewMemberRepo
      .createQueryBuilder('crewMember')
      .where('crewMember.ship = :id', { id: shipId })
      .andWhere({
        firstName,
        lastName
      })
      .where("crewMember.socialSecurityNumber like :number", { number:`${convertBirthDateToString(new Date(birthDate as string))}%` })
      .getMany()
      return res.status(200).json(records[0])
    }
    else{
      const records = await crewMemberRepo
        .createQueryBuilder('crewMember')
        .where('crewMember.ship = :id', { id: shipId })
        .getMany()
        return res.status(200).json(records)
    }
  }

  async function createShipCrewMember() {
    let crewMember = crewMemberRepo.create(req.body as Object)
    const errors = await validate(crewMember)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      const ship = await shipRepo.findOne(shipId as string)
      if (!ship) return res.status(400)
      crewMember = await connectRecordToNewCrewMember(crewMember)
      crewMember.ship = ship
      await crewMemberRepo.save(crewMember)
      return res.status(200).json(crewMember)
    }
  }
  async function connectRecordToNewCrewMember(crewMember: CrewMember) {
    const records = await recordRepo.find({
      where: {
        firstName: crewMember.firstName,
        lastName: crewMember.lastName,
      }
    })
    if (records) {
      crewMember.records = records
      console.log(records)
      return crewMember
    }
    return crewMember
  }
}
export default apiAuth(handler)