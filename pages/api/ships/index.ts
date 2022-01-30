import { Ship } from './../../../lib/db/entity/Ship'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager, getRepository } from 'typeorm'
import { validate,  ValidationError } from 'class-validator'
import { getConn } from '../../../lib/db/connection'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ship | Ship[] | ValidationError[]>
) {
  const conn = await getConn()
  const shipRepo = conn.getRepository(Ship)

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
