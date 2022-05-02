import { Ship } from './../../../lib/db/entity/Ship'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getManager } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { getConn } from '../../../lib/db/connection'
import { UserEntity } from '../../../lib/db/entity/entities'
import apiAuth from 'lib/utils/apiAuth'
import { getToken } from 'next-auth/jwt'

 async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ship | Ship[] | ValidationError[]>
) {
  const conn = await getConn()
  const shipRepo = conn.getRepository(Ship)
  const token = await getToken({ req })

  switch (req.method) {
    case 'GET':
      return getShips()
    case 'POST':
      return createShip()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getShips() {
    const ships = await shipRepo
      .createQueryBuilder('ships')
      .where('ships.user = :id' ,{ id: token?.user.id })
      .getMany()
    return res.status(200).json(ships)
  }

  async function createShip() {
    let ship = shipRepo.create(req.body as Object)

    const errors = await validate(ship)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    }else if(!token?.user.id){
      return res.status(400).end('No id found')
    }else {
      const user = await conn.getRepository(UserEntity).findOne(token?.user.id)
      console.log(user)
      ship.user = user as UserEntity
      await conn.getRepository(Ship).save(ship)
      return res.status(200).json(ship)
    }
  }
}
export default apiAuth(handler)
