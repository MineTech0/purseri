import { AllRecords } from './../../../../types/types.d'
import { CrewMember } from './../../../../lib/db/entity/CrewMember'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Between, getManager, IsNull, Like } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import { getConn } from '../../../../lib/db/connection'
import { convertBirthDateToString } from 'lib/utils'
import apiAuth from 'lib/utils/apiAuth'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record | Record[] | ValidationError[] | AllRecords>
) {
  const { shipId, monthAndYear } = req.query
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
    if (monthAndYear === undefined) {
      return res.status(401)
    }
    const firstDay = new Date(monthAndYear as string)
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)

    let memberRecords = await memberRepo
      .createQueryBuilder('crewMember')
      .leftJoinAndSelect('crewMember.records', 'records')
      .where(`records.date BETWEEN :first AND :last`, { first: firstDay, last: lastDay })
      .andWhere({ ship: shipId })
      .orderBy({
        'records.date': 'DESC',
      })
      .getMany()

    memberRecords = memberRecords.filter((member) => member.records.length !== 0)

    const unnamedRecords = await recordRepo
      .createQueryBuilder('record')
      .where('record.ship = :id', { id: shipId })
      .andWhere({ crewMember: IsNull() })
      .andWhere({ date: Between(firstDay.toISOString(), lastDay.toISOString()) })
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
        socialSecurityNumber: Like(`${convertBirthDateToString(req.body.birthDate)}%`),
      })
      if (member) {
        record.crewMember = member
        record.socialSecurityNumber = null
      }
      const ship = await shipRepo.findOne(shipId as string)
      if (!ship) return res.status(400)
      record.ship = ship
      await getManager().save(record)
      return res.status(200).json(record)
    }
  }
}
export default apiAuth(handler)