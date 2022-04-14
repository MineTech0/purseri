import { Grid, Input, useModal } from '@nextui-org/react';
import axios from 'axios'
import FileButton from 'components/common/FileButton'
import useConfirmation from 'hooks/useConfirmation'
import { getMonthAndYear } from 'lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import { Ship } from '../../../../lib/db/entity/Ship'
import ShipRecordService from '../../../../services/ShipRecordService'
import { AllRecords } from '../../../../types/types'
import MemberModal from '../Modals/MemberModal'
import NoRecordsText from './NoRecordsText'
import RecordsWrapper from './RecordsWrapper'

interface Props {
  ship: Ship
}

const RecordList = ({ ship }: Props): JSX.Element | null => {
  const [records, setRecords] = useState<AllRecords>()
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null)
  const { setVisible, bindings } = useModal()
  const [month, setMonth] = useState(getMonthAndYear())
  const { AskConfirmationModal, getConfirmation } = useConfirmation()
  const router = useRouter()

  useEffect(() => {
    ShipRecordService.getShipRecords(ship.id, month).then((rec) => {
      setRecords(rec)
    })
  }, [ship, month])

  const memberClick = (member: CrewMember) => {
    setSelectedMember(member)
    setVisible(true)
  }
  const addHandler = (recordId: string) => {
    router.push(`dashboard/ship/${ship.id}/crew?newMemberRecordId=${recordId}`)
  }

  const deleteHandler = async(recordId: string) => {
    if(await getConfirmation('Haluatko varmasti poistaa ilmoituksen')){
      ShipRecordService.deleteRecord(ship.id, recordId)
        .then(() => {
          if (records) {
            setRecords({
              memberRecords: records.memberRecords,
              unnamedRecords: records.unnamedRecords.filter(record => record.id !== recordId),
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const downloadNote = () => {
    axios
      .post<Blob>(
        `/api/ships/${ship.id}/print`,
        {
          date: month,
          memberRecords: records?.memberRecords,
          unnamedRecordIds: records?.unnamedRecords.map(record => record.id),
        },
        {
          responseType: 'blob',
          timeout: 30000,
        }
      )
      .then((result) => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(result.data)
        link.download = `${month}-Meripalveluilmoitus.pdf`
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
            <FileButton onClick={() => downloadNote()} />
          </Grid>
        ) : null}
      </Grid.Container>
      {!records || records.memberRecords.length + records.unnamedRecords.length === 0 ? (
        <NoRecordsText />
      ) : (
        <RecordsWrapper
          records={records}
          memberClick={memberClick}
          addHandler={addHandler}
          deleteHandler={deleteHandler}
        />
      )}

      <MemberModal crewMember={selectedMember} bindings={bindings} />
      <AskConfirmationModal />
    </Grid.Container>
  )
}

export default RecordList
