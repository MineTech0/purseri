import { getConn } from 'lib/db/connection'
import { Record } from 'lib/db/entity/Record'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
}).delete('api/ships/:shipId/records/:recordId', async (req, res) => {
  const { shipId, recordId } = req.query

  const conn = await getConn()
  const recordRepo = conn.getRepository(Record)
  try {
    await recordRepo
      .createQueryBuilder()
      .delete()
      .from(Record)
      .where('id = :recordId', { recordId })
      .andWhere('shipId = :shipId', { shipId })
      .execute()

    console.log('deleted', recordId)
    return res.status(200).end('Deleted')
  } catch (error) {
    return res.status(400).end('Error occured')
  }
})

export default handler
