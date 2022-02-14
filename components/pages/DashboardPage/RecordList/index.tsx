import { Card, Grid, Spacer, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Record } from '../../../../lib/db/entity/Record'
import { Ship } from '../../../../lib/db/entity/Ship'
import ShipRecordService from '../../../../services/ShipRecordService'
import ShipService from '../../../../services/ShipService'
import { AllRecords } from '../../../../types/types'
import MemberRecordCard from './MemberRecordCard'
import NoRecordsText from './NoRecordsText'
import UnnamedRecordCard from './UnnamedRecordCard'

interface Props {
  ship: Ship
}

const RecordList = ({ ship }: Props): JSX.Element | null => {
  const [records, setRecords] = useState<AllRecords>()

  useEffect(() => {
    ShipRecordService.getShipRecords(ship.id).then((rec) => {
      setRecords(rec)
    })
  }, [ship])
  if (!records || records.memberRecords.length + records.unnamedRecords.length === 0)
    return <NoRecordsText />
  return (
    <Grid.Container direction="column" gap={1}>
      <Grid>
        <Grid.Container justify="space-between">
          <Text h4>Miehistön ilmoitukset</Text>
          <Text>Määrä: {records.memberRecords.length}</Text>
        </Grid.Container>
      </Grid>
      {records.memberRecords.map((record, i) => (
        <Grid key={i}>
          <MemberRecordCard record={record} />
        </Grid>
      ))}
      <Spacer y={3}/>
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
    </Grid.Container>
  )
}

export default RecordList
