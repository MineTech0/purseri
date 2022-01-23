import { Record } from './../../../lib/db/entity/Record'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection, getRepository } from 'typeorm'
import connection from '../../../lib/db/connection'
import { validate } from 'class-validator'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record | Record[] | Er>
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
    try {
      const record = recordRepo.create(req.body)
      const errors = await validate(record)
      if (errors.length > 0) {
        return res.status(400).json({ message: error })
      } else {
        await getManager().save(post)
      }
      return res.status(200).json({ name, date, reason, info })
    } catch (error) {
      
    }
  }
}
