import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { Record } from '../../../../lib/db/entity/Record'
import { convertDate } from '../../../../lib/utils'

interface Props {
  record: Record
}

const UnnamedRecordCard = ({ record }: Props): JSX.Element => {
  return (
    <Card>
      <Grid.Container justify="space-between" alignItems="center">
        <Grid onClick={() => console.log('Card clicked')}>
          <Grid.Container direction="column">
            <Grid>
              <Text b size={17}>
                {record.firstName} {record.lastName}
              </Text>
            </Grid>
            <Grid>
              <Text b>{convertDate(record.date)}</Text>
            </Grid>
            <Grid>
              <Text>{record.reason}</Text>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid>
          <Button color="success" auto onClick={() => console.log('Button clicked')}>
            Hyväksy
          </Button>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default UnnamedRecordCard
