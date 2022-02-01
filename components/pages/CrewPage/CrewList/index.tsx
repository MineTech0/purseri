import React from 'react'
import { Grid, Text } from '@nextui-org/react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import MemberCard from './MemberCard'

interface Props {
  crew: CrewMember[]
}

const CrewList = ({ crew }: Props): JSX.Element => {
  return (
    <Grid.Container direction="column" gap={1}>
      {crew.map((member) => (
        <Grid key={member.id}>
          <MemberCard crewMember={member} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default CrewList
