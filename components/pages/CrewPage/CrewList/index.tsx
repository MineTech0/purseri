import React, { useState } from 'react'
import { Grid, Text, useModal } from '@nextui-org/react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import MemberCard from './MemberCard'
import EditMemberModal from '../EditMemberModal'

interface Props {
  crew: CrewMember[]
}

const CrewList = ({ crew }: Props): JSX.Element => {
  const { setVisible, bindings } = useModal()
  const [editMember, setEditMember] = useState<CrewMember>()
  const onEdit = (id: string) => {
    const member = crew.find(cm => cm.id === id)
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
      <EditMemberModal
        bindings={bindings}
        setVisible={setVisible}
        crewMember={editMember}
        sendHandler={(data) => console.log(data)}
      />
    </Grid.Container>
  )
}

export default CrewList
