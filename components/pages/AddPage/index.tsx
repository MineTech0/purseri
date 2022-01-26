import { Grid, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { Ship } from '../../../lib/db/entity/Ship'
import RecordService from '../../../services/RecordService'
import { RecordFormData } from '../../../types'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import RecordForm from './RecordForm'
import ResultPage from './ResultPage'

interface Props {
  ship: Ship
}

const AddPage = ({ ship }: Props): JSX.Element => {
  console.log(ship)
  const [result, setResult] =
    useState<{ type: 'success' | 'error'; message: string }>()

  const sendFormHandler = (data: RecordFormData) => {
    RecordService.create({
      shipId: ship.id,
      ...data,
    })
      .then((data) => {
        setResult({
          type: 'success',
          message: 'Kiitos ilmoituksesta',
        })
      })
      .catch((error: any) => {
        setResult({
          type: 'error',
          message: error.toString(),
        })
      })
  }
  if (result) return <ResultPage message={result.message} type={result.type} />

  return (
    <Layout>
      <Grid.Container direction="column">
        <Grid>
          <Text size={20}>Ilmoita meripäivä</Text>
        </Grid>
        <Grid>
          <ShipInfo />
        </Grid>
        <Grid>
          <RecordForm sendForm={sendFormHandler} />
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default AddPage
