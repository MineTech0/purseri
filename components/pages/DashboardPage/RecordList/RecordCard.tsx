import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'
import { Record } from '../../../../lib/db/entity/Record'

interface Props {
    record: Record
}

const RecordCard = ({record}: Props): JSX.Element => {
  return (
    <Card >
      <Grid.Container justify="space-between" alignItems='center'>
        <Grid onClick={()=> console.log('Card clicked')}>
          <Grid.Container direction='column'>
            <Grid>
              <Text b size={17}>
                {record.name}
              </Text>
            </Grid>
            <Grid>
              <Text b>{record.date.toLocaleDateString()}</Text>
            </Grid>
            <Grid>
              <Text>{record.reason}</Text>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid>
          <Button color="success" auto onClick={()=> console.log('Button clicked') }> 
            Hyväksy
          </Button>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default RecordCard
