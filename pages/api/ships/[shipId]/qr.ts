import QRCode from 'qrcode'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shipId } = req.query
  const qrStream = new PassThrough()
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'image; filename=PurseriQrCode.png');
  await QRCode.toFileStream(qrStream, `${process.env.NEXTAUTH_URL}/add/${shipId}`, {
    type: 'png',
    width: 200
  })

  qrStream.pipe(res)
}
