import { Record } from 'lib/db/entity/Record'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import CrewPage from '../../../../../components/pages/CrewPage'
import { getConn } from '../../../../../lib/db/connection'
import { Ship } from '../../../../../lib/db/entity/Ship'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const { shipId, newMemberRecordId } = context.query
  const conn = await getConn()
  const shipRepo = conn.getRepository(Ship)
  let ship = null
  try {
    ship = await shipRepo
      .createQueryBuilder('ship')
      .where({ user: session?.user.id, id: shipId })
      .leftJoinAndSelect('ship.crew', 'crew')
      .addSelect('crew.socialSecurityNumber')
      .getOneOrFail()
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
  let newMember = null
  if (newMemberRecordId) {
    const newMemberRecord = await conn.getRepository(Record).findOne(newMemberRecordId as string, {
      where: {
        ship: {
          id: shipId,
        },
      },
      select: ['firstName','lastName','socialSecurityNumber']
    })
    if (newMemberRecord) {
      newMember = {
        firstName: newMemberRecord.firstName,
        lastName: newMemberRecord.lastName,
        socialSecurityNumber: newMemberRecord.socialSecurityNumber,
      }
    }
  }

  return {
    props: {
      ship: JSON.parse(JSON.stringify(ship)),
      newMember: newMember ? JSON.parse(JSON.stringify(newMember)) : null,
    },
  }
}

export default CrewPage
