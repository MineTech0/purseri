import { Button, Grid, Input, Spacer, Text, useModal } from '@nextui-org/react'
import axios from 'axios'
import FileButton from 'components/common/FileButton'
import { getMonthAndYear } from 'lib/utils'
import { useEffect, useState } from 'react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import { Ship } from '../../../../lib/db/entity/Ship'
import ShipRecordService from '../../../../services/ShipRecordService'
import { AllRecords } from '../../../../types/types'
import MemberModal from '../Modals/MemberModal'
import MemberRecordCard from './MemberRecordCard'
import NoRecordsText from './NoRecordsText'
import RecordsWrapper from './RecordsWrapper'
import UnnamedRecordCard from './UnnamedRecordCard'

interface Props {
  ship: Ship
}

const RecordList = ({ ship }: Props): JSX.Element | null => {
  const [records, setRecords] = useState<AllRecords>()
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null)
  const { setVisible, bindings } = useModal()
  const [month, setMonth] = useState(getMonthAndYear())

  useEffect(() => {
    ShipRecordService.getShipRecords(ship.id, month).then((rec) => {
      setRecords(rec)
    })
  }, [ship, month])

  const memberClick = (member: CrewMember) => {
    setSelectedMember(member)
    setVisible(true)
  }
  const downloadNote = () => {
    axios
      .post<Blob>(
        `/api/ships/${ship.id}/print`,
        {
          date: month,
          memberRecords: records?.memberRecords,
        },
        {
          responseType: 'blob',
          timeout: 30000,
        }
      )
      .then((result) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(result.data)
        link.download = `${month}-meripäiväilmoitukset.pdf`
        document.body.append(link)
        link.click()
        link.remove()
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 7000)
      })
  }

  return (
    <Grid.Container direction="column" gap={1}>
      <Grid.Container direction="row" justify="space-between" gap={1}>
        <Grid>
          <Input
            bordered
            color="primary"
            type={'month'}
            value={month}
            max={getMonthAndYear()}
            onChange={(e) => setMonth(e.target.value)}
          />
        </Grid>
        {!records || records.memberRecords.length + records.unnamedRecords.length !== 0 ? (
          <Grid>
            <FileButton onClick={() => downloadNote()}/>
          </Grid>
        ) : null}
      </Grid.Container>
      {!records || records.memberRecords.length + records.unnamedRecords.length === 0 ? (
        <NoRecordsText />
      ) : (
        <RecordsWrapper records={records} memberClick={memberClick} />
      )}

      <MemberModal crewMember={selectedMember} bindings={bindings} />
    </Grid.Container>
  )
}

export default RecordList
