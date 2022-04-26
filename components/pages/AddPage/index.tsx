import { Grid, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { Ship } from '../../../lib/db/entity/Ship'
import { FormResult, RecordFormData } from '../../../types/types'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import RecordForm from './RecordForm'
import ResultPage from '../../common/ResultPage'
import ShipRecordService from '../../../services/ShipRecordService'
import ShipCrewMemberService from 'services/ShipCrewMemberService'
import useAskSocial from './useAskSocial'
import Head from 'next/head'

interface Props {
  ship: Ship
}

const AddPage = ({ ship }: Props): JSX.Element => {
  const [result, setResult] = useState<FormResult>()
  const { AskModal, getNumber } = useAskSocial()

  const sendFormHandler = (data: RecordFormData) => {
    ShipCrewMemberService.crewMemberExists(
      ship.id,
      data.firstName,
      data.lastName,
      data.birthDate.toISOString()
    ).then(async (member) => {
      if (member.exists) {
        ShipRecordService.addRecord(ship.id, data)
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
      } else {
        const number = await getNumber()
        if (number) {
          ShipRecordService.addRecord(ship.id, { ...data, socialSecurityNumber: number })
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
      }
    })
  }
  if (result) return <ResultPage message={result.message} type={result.type} />

  return (
    <>
     <Head>
        <title>{`Ilmoita meripäivä | ${ship.name}`}</title>
        <meta property="og:title" content={`Ilmoita meripäivä | ${ship.name}`} key="title" />
      </Head>
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
      <AskModal />
    </>
  )
}

export default AddPage
