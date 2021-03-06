import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { CrewMember } from '../../../../lib/db/entity/CrewMember'

interface Props {
  crewMember: CrewMember
  onEdit: (id:string) => void
}

const MemberCard = ({ crewMember, onEdit }: Props): JSX.Element => {
  return (
    <Card>
      <Grid.Container justify='space-between' alignItems="center">
        <Grid>
          <Grid.Container direction="column">
            <Grid>
              <Text h4 size={17}>
                {crewMember.firstName} {crewMember.lastName}
              </Text>
            </Grid>
            <Grid>
              <Text>{crewMember.role}</Text>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid>
            <Button onClick={()=> onEdit(crewMember.id)} auto color={'secondary'}>Muokkaa</Button>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default MemberCard
