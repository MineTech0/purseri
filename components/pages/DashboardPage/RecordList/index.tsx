import { Card, Grid, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import ShipService from '../../../../services/ShipService'
import NoRecordsText from './NoRecordsText'
import RecordCard from './RecordCard'

interface Props {
  ship: Ship;
}

const RecordList = ({ship}: Props): JSX.Element | null => {

  const [records, setRecords] = useState<Record[]>([])

  useEffect(() => {
    ShipService.getShipRecords(ship.id).then(rec => {
      setRecords(rec)
    })
  }, [ship])
  if(records.length === 0) return <NoRecordsText/>
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
