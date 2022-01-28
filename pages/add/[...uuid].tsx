import { GetServerSideProps } from 'next'
import { getRepository } from 'typeorm'
import AddPage from '../../components/pages/AddPage'
import connection from '../../lib/db/connection'
import { Ship } from '../../lib/db/entity/Ship'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query

  if(!uuid){
    return {
        notFound: true,
      }
  }

  await connection()
  const shipRepo = getRepository(Ship)
  let ship = null
  console.log(uuid)
  try {
    ship = await shipRepo.findOneOrFail(uuid[0], {
      relations: ['records'],
    })
  } catch (error) {
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

export default AddPage
