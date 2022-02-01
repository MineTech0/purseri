import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import CrewPage from "../../../../../components/pages/CrewPage"
import { getConn } from "../../../../../lib/db/connection"
import { Ship } from "../../../../../lib/db/entity/Ship"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const { shipId } = context.query
    const conn = await getConn()
      const shipRepo = conn.getRepository(Ship)
      let ship = null
      try {
        ship = await shipRepo
        .createQueryBuilder("ship")
        .where({ user: session?.user.id, id: shipId } )
        .getOneOrFail();
      } catch (error) {
          console.log(error)
        return {
            notFound: true,
          }
      }
  
    return {
      props: {
        ship: JSON.parse(JSON.stringify(ship)),
      },
    }
  }
  
export default CrewPage

