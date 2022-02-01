import { Grid, Text, useModal } from '@nextui-org/react'
import React from 'react'
import { Ship } from '../../../lib/db/entity/Ship'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import CrewActionBar from './CrewActionBar'
import CrewList from './CrewList'
import NewMemberModal from './NewMemberModal'

interface Props {
  ship: Ship | null
}

const CrewPage = ({ ship }: Props): JSX.Element => {
  const { setVisible, bindings } = useModal()
  const crew = [{ firstName: 'Niilo', lastName: 'Kurki', role: 'Kansimies' }]
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
              <CrewActionBar crew={crew} openModal={() => setVisible(true)} />
            </Grid>
            <Grid xs={12}>
              <CrewList crew={crew} />
            </Grid>
          </>
        ) : null}
      </Grid.Container>
      <NewMemberModal
        bindings={bindings}
        setVisible={setVisible}
        sendHandler={() => console.log('send')}
      />
    </Layout>
  )
}

export default CrewPage
