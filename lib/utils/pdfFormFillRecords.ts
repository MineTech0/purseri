import { MemberRecord, MockMemberRecord } from './../../types/types.d'
import { Ship } from 'lib/db/entity/Ship'
import { PDFForm } from 'pdf-lib'

export const pdfFormFillRecords = (
  form: PDFForm,
  memberRecords: (MemberRecord | MockMemberRecord)[],
  ship: Ship,
  date: string
): PDFForm => {
    const firstDay = new Date(date)
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
  memberRecords.forEach((memberRecord, i) => {
    let number = i + 1
    if (number <= 4) {
      form
        .getTextField('nimi' + number)
        .setText(`${memberRecord.lastName} ${memberRecord.firstName}`)
      form.getTextField('hetu' + number).setText(memberRecord.socialSecurityNumber)
      form.getTextField('kansalaisuus' + number).setText('FI')
      form.getTextField('toimii' + number).setText(memberRecord.role)
      form.getTextField('alkoi' + number).setText(firstDay.toLocaleDateString('fi-FI'))
      form.getTextField('loppui' + number).setText(lastDay.toLocaleDateString('fi-FI'))
      form.getTextField('lkm' + number).setText(memberRecord.records.length.toString())
      form.getTextField('alue' + number).setText(ship.area.toString())
    }
    else {
        form
        .getTextField(number+'_1_nimi')
        .setText(`${memberRecord.lastName} ${memberRecord.firstName}`)
      form.getTextField(number+'_2_hetu').setText(memberRecord.socialSecurityNumber)
      form.getTextField(number+'_3_kansalaisuus').setText('FI')
      form.getTextField(number+'_4_toimii').setText(memberRecord.role)
      form.getTextField(number+'_5_alkoi').setText(firstDay.toLocaleDateString('fi-FI'))
      form.getTextField(number+'_6_loppui').setText(lastDay.toLocaleDateString('fi-FI'))
      form.getTextField(number+'_7_lkm').setText(memberRecord.records.length.toString())
      form.getTextField(number+'_8_alue').setText(ship.area.toString())
    }
  })
  return form
}
