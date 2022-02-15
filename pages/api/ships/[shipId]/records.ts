import { AllRecords } from './../../../../types/types.d'
import { CrewMember } from './../../../../lib/db/entity/CrewMember'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager, getRepository, IsNull, Not } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import { getConn } from '../../../../lib/db/connection'
import { instanceToPlain } from 'class-transformer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record | Record[] | ValidationError[] | AllRecords>
) {
  const { shipId } = req.query
  const conn = await getConn()
  const recordRepo = conn.getRepository(Record)
  const shipRepo = conn.getRepository(Ship)
  const memberRepo = conn.getRepository(CrewMember)

  switch (req.method) {
    case 'GET':
      return getShipRecords()
    case 'POST':
      return createShipRecord()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShipRecords() {
    const memberRecords = await memberRepo
      .createQueryBuilder('crewMember')
      .leftJoinAndSelect('crewMember.records', 'record')
      .where({ ship: shipId })
      .getMany()

    const unnamedRecords = await recordRepo
      .createQueryBuilder('record')
      .where('record.ship = :id', { id: shipId })
      .andWhere({ crewMember: IsNull() })
      .getMany()
    return res.status(200).json({
      memberRecords,
      unnamedRecords,
    })
  }

  async function createShipRecord() {
    let record = recordRepo.create(req.body as Object)
    const errors = await validate(record)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      const member = await memberRepo.findOne({
        firstName: record.firstName,
        lastName: record.lastName,
      })
      if (member) {
        record.crewMember = member
      }
      const ship = await shipRepo.findOne(shipId as string)
      if (!ship) return res.status(400)
      record.ship = ship
      await getManager().save(record)
      return res.status(200).json(record)
    }
  }
}
