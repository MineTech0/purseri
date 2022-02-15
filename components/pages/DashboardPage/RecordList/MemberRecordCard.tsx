import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { MemberRecord } from '../../../../types/types'

interface Props {
  record: MemberRecord
  memberClick: () => void
}

const MemberRecordCard = ({ record, memberClick }: Props): JSX.Element => {
  return (
    <Card>
      <Grid.Container justify="space-between" alignItems="center">
        <Grid onClick={memberClick}>
          <Grid.Container direction="column">
            <Grid>
              <Text b size={17}>
                {record.fullname}
              </Text>
            </Grid>
            <Grid>
              <Text>{record.count}</Text>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default MemberRecordCard
