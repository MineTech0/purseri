import { Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import NoRecordsText from './NoRecordsText'
import RecordCard from './RecordCard'

interface Props {
  records: Record[] | null
}

const RecordList = ({records}: Props): JSX.Element | null => {
  if(!records) return <NoRecordsText/>
  return (
    <Grid.Container direction="column" gap={1}>
      <Grid>
        <Text>Määrä: {records.length}</Text>
      </Grid>
      {records.map((record, i) => (
        <Grid key={record.id}>
          <RecordCard record={record} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default RecordList
