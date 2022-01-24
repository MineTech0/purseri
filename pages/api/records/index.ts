import { Record } from './../../../lib/db/entity/Record'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection, getManager, getRepository } from 'typeorm'
import connection from '../../../lib/db/connection'
import { validate,  ValidationError } from 'class-validator'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record | Record[] | ValidationError[]>
) {
  await connection()
  const recordRepo = getRepository(Record)

  switch (req.method) {
    case 'GET':
      return getRecords()
    case 'POST':
      return createRecord()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getRecords() {
    const records = await recordRepo.find()
    return res.status(200).json(records)
  }

  async function createRecord() {
    const record = recordRepo.create(req.body)
    const errors = await validate(record)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      await getManager().save(record)
      return res.status(200).json(record)
    }
  }
}
