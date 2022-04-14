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

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync(path.resolve('./files', 'Merimiesrekisteri-ilmoitus.pdf'))
  )
  const { month, year } = splitDate(req.body.date as string)

  //add non crew records to report
  const unnamedRecordIds = req.body.unnamedRecordIds

  const unnamedRecords = await conn.getRepository(Record).findByIds(unnamedRecordIds, {
    select: ['firstName', 'lastName', 'socialSecurityNumber', 'id'],
  })

  let nonCrewRecords: MockMemberRecord[] = []

  unnamedRecords.forEach((record) => {
    const member = nonCrewRecords.find(
      (rec) => rec.socialSecurityNumber === record.socialSecurityNumber
    )
    if (!member) {
      nonCrewRecords.push({
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
    }
  )
  memberRecords = memberRecords.map((record) => {
    return {
      ...record,
      socialSecurityNumber:
        membersSocial.find((mem) => mem.id === record.id)?.socialSecurityNumber || '',
    }
  })

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

  form = pdfFormFillRecords(
    form,
    [...memberRecords, ...nonCrewRecords],
    ship,
    req.body.date
  )

  const pdfBytes = await pdfDoc.save()
  res.write(pdfBytes, 'binary')
  res.end()
}
export default apiAuth(handler)
