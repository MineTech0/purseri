import { Ship } from './../../../lib/db/entity/Ship'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConnection, getManager, getRepository } from 'typeorm'
import connection from '../../../lib/db/connection'
import { validate,  ValidationError } from 'class-validator'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ship | Ship[] | ValidationError[]>
) {
  await connection()
  const shipRepo = getRepository(Ship)

  switch (req.method) {
    case 'GET':
      return getShips()
    case 'POST':
      return createShip()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShips() {
    const ships = await shipRepo.find()
    return res.status(200).json(ships)
  }

  async function createShip() {
    const ship = shipRepo.create(req.body)
    const errors = await validate(ship)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      await getManager().save(ship)
      return res.status(200).json(ship)
    }
  }
}
