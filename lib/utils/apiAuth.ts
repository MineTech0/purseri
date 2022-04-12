import { getConn } from 'lib/db/connection'
import { Ship } from 'lib/db/entity/Ship'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type HandlerI = (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>

function apiAuth(handler: HandlerI) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = await getToken({ req })
      const ships = (
        await (await getConn())
          .getRepository(Ship)
          .createQueryBuilder('ships')
          .select('ships.id')
          .where('ships.userId = :id', { id: token?.user.id })
          .getMany()
      ).map((ship) => ship.id)
      console.log('JSON Web Token', token)

      if (req.query.shipId && !ships.includes(req.query.shipId as string)) {
        return res.status(401).end(`Not your ship`)
      } else {
          // route handler
        await handler(req, res)
      }
    } catch (err) {
      // global error handler
      console.log(err)
      return res.status(400).end(`Error`)
    }
  }
}
export default apiAuth
