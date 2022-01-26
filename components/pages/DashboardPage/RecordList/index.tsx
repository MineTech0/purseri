import { Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import RecordCard from './RecordCard'

interface Props {}

const records = [1, 2, 3, 4, 5]
const RecordList = (props: Props): JSX.Element => {
  return (
    <Grid.Container direction="column" gap={1}>
      <Grid>
        <Text>Määrä: {records.length}</Text>
      </Grid>
      {records.map((v, i) => (
        <Grid key={i}>
          <RecordCard />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default RecordList
