import { Grid, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { Ship } from '../../../lib/db/entity/Ship'
import { FormResult, RecordFormData } from '../../../types/types'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import RecordForm from './RecordForm'
import ResultPage from '../../common/ResultPage'
import ShipService from '../../../services/ShipService'

interface Props {
  ship: Ship
}

const AddPage = ({ ship }: Props): JSX.Element => {
  const [result, setResult] =
    useState<FormResult>()

  const sendFormHandler = (data: RecordFormData) => {
    ShipService.addRecord(ship.id,data)
      .then((_newData) => {
        setResult({
          type: 'success',
          message: 'Kiitos ilmoituksesta',
        })
      })
      .catch((error) => {
        setResult({
          type: 'error',
          message: error.toString(),
        })
      })
  }
  if (result) return <ResultPage message={result.message} type={result.type} />

  return (
    <Layout>
      <Grid.Container direction="column" gap={2}>
        <Grid>
          <Text h2={true}>Ilmoita meripäivä</Text>
        </Grid>
        <Grid>
          <ShipInfo ship={ship} />
        </Grid>
        <Grid>
          <RecordForm sendForm={sendFormHandler} />
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default AddPage
