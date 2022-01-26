import { Button, Card, Grid, Text } from '@nextui-org/react'
import React from 'react'

interface Props {
    
}

const RecordCard = (props: Props): JSX.Element => {
  return (
    <Card >
      <Grid.Container justify="space-between" alignItems='center'>
        <Grid onClick={()=> console.log('Card clicked')}>
          <Grid.Container direction='column'>
            <Grid>
              <Text b size={17}>
                Niilo Kurki
              </Text>
            </Grid>
            <Grid>
              <Text b>20.2.2022</Text>
            </Grid>
            <Grid>
              <Text>Erittäin tärkeä syy</Text>
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
