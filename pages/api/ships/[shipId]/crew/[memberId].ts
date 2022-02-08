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
  const { shipId, memberId } = req.query
  const conn = await getConn()
  const crewMemberRepo = conn.getRepository(CrewMember)
  const shipRepo = conn.getRepository(Ship)

  switch (req.method) {
    case 'GET':
      return getShipCrewMember()
    case 'PUT':
      return editShipCrewMember()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShipCrewMember() {
    try {
      const member = await crewMemberRepo
        .createQueryBuilder('crewMember')
        .where({ ship: shipId, id: memberId })
        .getOneOrFail()
      return res.status(200).json(member)
    } catch (error) {
      return res.status(404)
    }
  }

  async function editShipCrewMember() {
    let newCrewMember = crewMemberRepo.create(req.body as Object)
    const errors = await validate(newCrewMember)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      const ship = await shipRepo.findOne(shipId as string)
      if (!ship) return res.status(400)
      await crewMemberRepo.update(memberId, {
        ...newCrewMember,
      })
      const updatedMember = await crewMemberRepo.findOne(memberId as string)
      if (!updatedMember) return res.status(500)
      return res.status(200).json(updatedMember)
    }
  }
}
