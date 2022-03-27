import { Ship } from './../../../lib/db/entity/Ship'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager } from 'typeorm';
import { validate,  ValidationError } from 'class-validator'
import { getConn } from '../../../lib/db/connection'
import { getSession } from 'next-auth/react'
import { UserEntity } from '../../../lib/db/entity/entities'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ship | Ship[] | ValidationError[]>
) {
  const conn = await getConn()
  const shipRepo = conn.getRepository(Ship)
  const session = await getSession()

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
    let ship = shipRepo.create(req.body as Object)
    
    const errors = await validate(ship)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    } else {
      const user = await conn.getRepository(UserEntity).findOne(session?.user.id)
      ship.user = user as UserEntity
      await getManager().save(ship)
      return res.status(200).json(ship)
    }
  }
}
