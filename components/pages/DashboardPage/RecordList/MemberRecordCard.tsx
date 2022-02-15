import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'
import { MemberRecord } from '../../../../types/types'

interface Props {
  crewMember: CrewMember
  memberClick: () => void
}

const MemberRecordCard = ({ crewMember, memberClick }: Props): JSX.Element => {
  return (
    <Card clickable onClick={memberClick}>
      <Grid.Container justify="space-between" alignItems="center">
        <Grid>
          <Grid.Container direction="column">
            <Grid>
              <Text b size={17}>
                {crewMember.firstName} {crewMember.lastName}
              </Text>
            </Grid>
            <Grid>
              <Text>{crewMember.records.length}</Text>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default MemberRecordCard
