import { Grid, Text, useModal } from '@nextui-org/react'
import React, { useState } from 'react'
import { useResult } from '../../../hooks/useResult'
import { Ship } from '../../../lib/db/entity/Ship'
import ShipCrewMemberService from '../../../services/ShipCrewMemberService'
import ShipService from '../../../services/ShipService'
import { CrewMemberFormData, FormResult } from '../../../types/types'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import CrewActionBar from './CrewActionBar'
import CrewList from './CrewList'
import NewMemberModal from './NewMemberModal'

interface Props {
  ship: Ship
}

const CrewPage = ({ ship }: Props): JSX.Element => {
  const { setVisible, bindings } = useModal()
  const [ResultBannerWrapper, setResult] = useResult()

  const newCrewMember = (formData: CrewMemberFormData) => {
    ShipCrewMemberService.addCrewMember(ship.id,formData)
      .then((data) => {
        ship.crew.push(data)
        setResult({
          type: 'success',
          message: 'Miehistön jäsen lisätty',
        })
      })
      .catch((error) => {
        setResult({
          type: 'error',
          message: error.toString(),
        })
      })
  }

  const editCrewMember = (formData: CrewMemberFormData) => {
    ShipService.
  } 
  
  
  return (
    <Layout>
      <Grid.Container gap={2} direction="column">
        <Grid xs={12}>
          <Text h2>Miehistö</Text>
        </Grid>
        {ship ? (
          <>
            <Grid xs={12}>
              <ShipInfo ship={ship} />
            </Grid>
            <Grid xs={12}>
              <CrewActionBar crew={ship.crew} openModal={() => setVisible(true)} />
            </Grid>
            <Grid xs={12}>
              <ResultBannerWrapper/>
            </Grid>
            <Grid xs={12}>
              <CrewList crew={ship.crew} />
            </Grid>
          </>
        ) : null}
      </Grid.Container>
      <NewMemberModal
        bindings={bindings}
        setVisible={setVisible}
        sendHandler={newCrewMember}
      />
    </Layout>
  )
}

export default CrewPage
