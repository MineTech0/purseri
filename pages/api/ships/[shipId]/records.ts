import { AllRecords } from './../../../../types/types.d'
import { CrewMember } from './../../../../lib/db/entity/CrewMember'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Between, IsNull, Like } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import { getConn } from '../../../../lib/db/connection'
import { convertBirthDateToString } from 'lib/utils'
import nc from 'next-connect'
import apiAuthMiddleware from 'lib/utils/apiAuthMiddleware'

const handler = nc<
  NextApiRequest,
  NextApiResponse<Record | Record[] | ValidationError[] | AllRecords>
>({
  onError: (err, _req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  },
})
  .get(apiAuthMiddleware, async (req, res) => {
    const conn = await getConn()
    const recordRepo = conn.getRepository(Record)
    const memberRepo = conn.getRepository(CrewMember)

    const { shipId, monthAndYear } = req.query
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
  })
  //any one can access
  .post(async (req, res) => {
    const conn = await getConn()
    const recordRepo = conn.getRepository(Record)
    const shipRepo = conn.getRepository(Ship)
    const memberRepo = conn.getRepository(CrewMember)

    const { shipId } = req.query
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
      await conn.getRepository(Record).save(record)
      return res.status(201).json(record)
    }
  })

export default handler
