import { Grid, Spacer, Text, useModal } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import { Ship } from '../../../../lib/db/entity/Ship'
import ShipRecordService from '../../../../services/ShipRecordService'
import { AllRecords } from '../../../../types/types'
import MemberModal from '../Modals/MemberModal'
import MemberRecordCard from './MemberRecordCard'
import NoRecordsText from './NoRecordsText'
import UnnamedRecordCard from './UnnamedRecordCard'

interface Props {
  ship: Ship
}

const RecordList = ({ ship }: Props): JSX.Element | null => {
  const [records, setRecords] = useState<AllRecords>()
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null)
  const { setVisible, bindings } = useModal()

  useEffect(() => {
    ShipRecordService.getShipRecords(ship.id).then((rec) => {
      setRecords(rec)
    })
  }, [ship])
  if (!records || records.memberRecords.length + records.unnamedRecords.length === 0) {
    return <NoRecordsText />
  }
  const memberClick = (member: CrewMember) => {
    setSelectedMember(member)
    setVisible(true)  
  }
  

  return (
    <Grid.Container direction="column" gap={1}>
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
      <MemberModal crewMember={selectedMember} bindings={bindings} />
    </Grid.Container>
  )
}

export default RecordList
