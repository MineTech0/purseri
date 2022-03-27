import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import DashboardPage from '../../components/pages/DashboardPage'
import { getConn } from '../../lib/db/connection'
import { Ship } from '../../lib/db/entity/Ship'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const conn = await getConn()
  const shipRepo = conn.getRepository(Ship)
  const ships = await shipRepo
    .createQueryBuilder('ship')
    .where('ship.user = :id', { id: session?.user.id })
    .getMany()

  return {
    props: {
      ships: JSON.parse(JSON.stringify(ships)),
    },
  }
}

export default DashboardPage
