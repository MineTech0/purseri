import { convertBirthDateToString } from './../../../../../lib/utils/index';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getConn } from '../../../../../lib/db/connection'
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'

async function handler(req: NextApiRequest, res: NextApiResponse<{ exists: boolean }>) {
  const { shipId, firstName, lastName, birthDate } = req.query
  const conn = await getConn()
  const crewMemberRepo = conn.getRepository(CrewMember)

  switch (req.method) {
    case 'GET':
      return MemberExists()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function MemberExists() {
    if (firstName && lastName && birthDate) {
      const member = await crewMemberRepo
        .createQueryBuilder('crewMember')
        .where('crewMember.ship = :id', { id: shipId })
        .andWhere({
          firstName,
          lastName,
        })
        .where('crewMember.socialSecurityNumber like :number', {
          number: `${convertBirthDateToString(new Date(birthDate as string))}%`,
        })
        .getMany()
    if (member[0].id)return res.status(200).json({ exists: true })
    else return res.status(200).json({ exists: false })

    } else {
      return res.status(400)
    }
  }
}
export default handler