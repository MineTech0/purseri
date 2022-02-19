import { Grid, Spacer, Text } from '@nextui-org/react'
import { CrewMember } from 'lib/db/entity/CrewMember'
import React from 'react'
import { AllRecords } from 'types/types'
import MemberRecordCard from './MemberRecordCard'
import UnnamedRecordCard from './UnnamedRecordCard'

interface Props {
  records: AllRecords
  memberClick: (member: CrewMember) => void
}

const RecordsWrapper = ({ records, memberClick }: Props): JSX.Element => {
  return (
    <>
      <Grid>
        <Grid.Container justify="space-between">
          <Text h4>Miehistön ilmoitukset</Text>
          <Text>Määrä: {records.memberRecords.length}</Text>
        </Grid.Container>
      </Grid>

      {records.memberRecords.map((member) => (
        <Grid key={member.id}>
          <MemberRecordCard crewMember={member} memberClick={() => memberClick(member)} />
        </Grid>
      ))}

      <Spacer y={3} />
      <Grid>
        <Grid.Container justify="space-between">
          <Text h4>Ei miehistön ilmoitukset</Text>
          <Text>Määrä: {records.unnamedRecords.length}</Text>
        </Grid.Container>
      </Grid>
      {records.unnamedRecords.map((record, i) => (
        <Grid key={record.id}>
          <UnnamedRecordCard record={record} />
        </Grid>
      ))}
    </>
  )
}

export default RecordsWrapper
