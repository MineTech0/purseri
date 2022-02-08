import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Ship } from '../../../../../lib/db/entity/Ship'
import { getConn } from '../../../../../lib/db/connection'
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CrewMember | CrewMember[] | ValidationError[] | { name: string; count: number }
  >
) {
  const { shipId } = req.query
  const conn = await getConn()
  const crewMemberRepo = conn.getRepository(CrewMember)
  const shipRepo = conn.getRepository(Ship)

  switch (req.method) {
    case 'GET':
      return getShipCrew()
    case 'POST':
      return createShipCrewMember()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShipCrew() {
    const records = await crewMemberRepo
      .createQueryBuilder('crewMember')
      .where('crewMember.ship = :id', { id: shipId })
      .getMany()
    return res.status(200).json(records)
  }

  async function createShipCrewMember() {
    let crewMember = crewMemberRepo.create(req.body as Object)
    const errors = await validate(crewMember)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      const ship = await shipRepo.findOne(shipId as string)
      if (!ship) return res.status(400)
      crewMember.ship = ship
      await getManager().save(crewMember)
      return res.status(200).json(crewMember)
    }
  }
}
