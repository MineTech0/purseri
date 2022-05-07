import { MemberRecord, MockMemberRecord } from './../../../../types/types.d'
import { CrewMember } from 'lib/db/entity/CrewMember'
import { Record } from 'lib/db/entity/Record'
import { pdfFormFillRecords } from './../../../../lib/utils/pdfFormFillRecords'
import { splitDate } from './../../../../lib/utils/index'
import { Ship } from './../../../../lib/db/entity/Ship'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'
import { getConn } from 'lib/db/connection'
import apiAuth from 'lib/utils/apiAuth'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const { shipId } = req.query
  const conn = await getConn()
  const ship = await conn.getRepository(Ship).findOne(shipId)
  if (!ship) return res.status(404).json('No ship found')

  const { month, year } = splitDate(req.body.date as string)

  //add non crew records to report
  const unnamedRecordIds = req.body.unnamedRecordIds

  const unnamedRecords = await conn.getRepository(Record).findByIds(unnamedRecordIds, {
    select: ['firstName', 'lastName', 'socialSecurityNumber', 'id'],
    where: {
      ship: ship,
    },
  })

  let nonCrewRecords: MockMemberRecord[] = []

  unnamedRecords.forEach((record) => {
    const member = nonCrewRecords.find(
      (rec) => rec.socialSecurityNumber === record.socialSecurityNumber
    )
    if (!member) {
      nonCrewRecords.push({
        id: record.id,
        firstName: record.firstName,
        lastName: record.lastName,
        role: '',
        records: [record.id],
        socialSecurityNumber: record.socialSecurityNumber || '',
      })
    } else {
      nonCrewRecords = nonCrewRecords.map((arrMember) =>
        arrMember.socialSecurityNumber === member.socialSecurityNumber
          ? { ...arrMember, records: [...arrMember.records, record.id] }
          : arrMember
      )
    }
  })

  //add socialSecurityNumber to crewMember records
  let memberRecords: MemberRecord[] = req.body.memberRecords

  const membersSocial = await conn.getRepository(CrewMember).findByIds(
    memberRecords.map((member) => member.id),
    {
      select: ['socialSecurityNumber', 'id'],
      where: {
        ship: ship,
      },
    }
  )
  memberRecords = memberRecords.map((record) => {
    return {
      ...record,
      socialSecurityNumber:
        membersSocial.find((mem) => mem.id === record.id)?.socialSecurityNumber || '',
    }
  })

  const combinedRecords = [...memberRecords, ...nonCrewRecords]

  //Split records to multiple files of 17 records
  const recordChunks = []

  for (let i = 0; i < combinedRecords.length; i += 17) {
    recordChunks.push(combinedRecords.slice(i, i + 17))
  }

  let files = await Promise.all(
    recordChunks.map(async (records) => {
      const pdfDoc = await PDFDocument.load(
        fs.readFileSync(path.resolve('./files', 'Merimiesrekisteri-ilmoitus.pdf'))
      )
      let form = pdfDoc.getForm()

      form.getTextField('vuosi').setText(year)
      form.getTextField('kk').setText(month)
      form.getTextField('alus').setText(ship.name)
      form.getTextField('tunn').setText(ship.idLetters)
      form.getTextField('imo').setText(ship.imo)
      form.getTextField('gt').setText(ship.gt.toString())
      form.getTextField('gt').setText(ship.gt.toString())
      form.getTextField('varust').setText(ship.owner)
      form.getTextField('osoite').setText(ship.address)
      form.getTextField('puh').setText('')
      form.getTextField('Sähköposti').setText('')
      form.getTextField('Sähköposti').setText('')
      form.getTextField('U 1').setText(ship.power.toString())
      form.getTextField('U 2').setText(ship.length.toString())
      form.getTextField('U 3').setText(ship.nationality)
      form.getTextField('U 4').setText(ship.home)

      form = pdfFormFillRecords(form, records, ship, req.body.date)

      return pdfDoc.saveAsBase64({ dataUri: true })
    })
  )

  res.json({ files })
}
export default apiAuth(handler)
