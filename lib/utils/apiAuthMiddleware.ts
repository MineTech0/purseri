import { getConn } from "lib/db/connection";
import { Ship } from "lib/db/entity/Ship";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextHandler } from "next-connect";

const apiAuthMiddleware = async(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) => {
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
  
        if (req.query.shipId && !ships.includes(req.query.shipId as string)) {
          return res.status(401).end(`Not your ship`)
        } else {
            // route handler
            next();
        }
      } catch (err) {
        // global error handler
        return res.status(400).end(`Error` + JSON.stringify(err))
      }
};
export default apiAuthMiddleware;