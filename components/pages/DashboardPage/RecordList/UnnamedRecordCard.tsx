import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react'
import DeleteButton from 'components/common/DeleteButton'
import PlusButton from 'components/common/PlusButton'
import React from 'react'
import { Record } from '../../../../lib/db/entity/Record'
import { convertDate } from '../../../../lib/utils'

interface Props {
  record: Record
  addHandler: (id: string) => void
  deleteHandler: (id: string) => void
}

const UnnamedRecordCard = ({ record, addHandler, deleteHandler }: Props): JSX.Element => {
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
          <Row gap={0.5}>
            <Col>
              <PlusButton
                onClick={() => {
                  addHandler(record.id)
                }}
              />
            </Col>
            <Col>
              <DeleteButton
                onClick={() => {
                  deleteHandler(record.id)
                }}
              />
            </Col>
          </Row>
        </Grid>
      </Grid.Container>
    </Card>
  )
}

export default UnnamedRecordCard
