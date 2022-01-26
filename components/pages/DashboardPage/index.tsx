import { Grid } from '@nextui-org/react'
import React from 'react'
import Layout from '../../Layout'
import RecordList from './RecordList'
import ShipInfo from '../../common/ShipInfo'
import ShipSelector from './ShipSelector'

const DashboardPage = (): JSX.Element => {
  return (
    <Layout>
      <Grid.Container gap={2} direction="column">
        <Grid xs={12}>
          <ShipSelector ships={[]} />
        </Grid>
        <Grid xs={12}>
          <ShipInfo />
        </Grid>
        <Grid xs={12}>
          <RecordList />
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default DashboardPage
