import { GetServerSideProps } from 'next'
import { getRepository } from 'typeorm'
import AddPage from '../../components/pages/AddPage'
import connection from '../../lib/db/connection'
import { Ship } from '../../lib/db/entity/Ship'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query

  await connection()
  const shipRepo = getRepository(Ship)
  let ship = null
  try {
    ship = await shipRepo.findOneOrFail(uuid as string, {
      relations: ['records'],
    })
  } catch (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ship,
    },
  }
}

export default AddPage
