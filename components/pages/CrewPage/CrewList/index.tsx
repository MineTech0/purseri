import React, { useState } from 'react'
import { Grid, Text, useModal } from '@nextui-org/react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import MemberCard from './MemberCard'
import EditMemberModal from '../EditMemberModal'
import { CrewMemberFormData } from '../../../../types/types'

interface Props {
  crew: CrewMember[]
  editCrewMember: (id: string, formData: CrewMemberFormData) => void
}

const CrewList = ({ crew, editCrewMember }: Props): JSX.Element => {
  const { setVisible, bindings } = useModal()
  const [editMember, setEditMember] = useState<CrewMember>()
  const onEdit = (id: string) => {
    const member = crew.find((cm) => cm.id === id)
    setEditMember(member)
    setVisible(true)
  }
  return (
    <Grid.Container direction="column" gap={1}>
      {crew.map((member) => (
        <Grid key={member.id}>
          <MemberCard crewMember={member} onEdit={onEdit} />
        </Grid>
      ))}
      {editMember ? (
        <EditMemberModal
          bindings={bindings}
          setVisible={setVisible}
          crewMember={editMember}
          sendHandler={(data) => editCrewMember(editMember.id, data)}
        />
      ) : null}
    </Grid.Container>
  )
}

export default CrewList
