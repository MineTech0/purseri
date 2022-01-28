import { Grid } from '@nextui-org/react'
import React from 'react'
import Layout from '../../Layout'
import RecordList from './RecordList'
import ShipInfo from '../../common/ShipInfo'
import ShipSelector from './ShipSelector'
import { useSession } from 'next-auth/react'

const DashboardPage = (): JSX.Element => {
  const { data: session, status } = useSession()
  return (
    <Layout>
      <p>Signed in as {session?.user?.name || null} <a href="/api/auth/signout">Sign out</a></p>
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
