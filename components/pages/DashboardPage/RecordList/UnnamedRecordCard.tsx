import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { Record } from '../../../../lib/db/entity/Record'

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
              <Text b>{new Date(record.date).toLocaleDateString('fi-FI')}</Text>
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
