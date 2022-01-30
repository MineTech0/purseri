import { Grid } from '@nextui-org/react'
import React, { useState } from 'react'
import Layout from '../../Layout'
import RecordList from './RecordList'
import ShipInfo from '../../common/ShipInfo'
import ShipSelector from './ShipSelector'
import { useSession } from 'next-auth/react'
import { Ship } from '../../../lib/db/entity/Ship'
import Link from 'next/link'

const DashboardPage = ({ ships }: { ships: Ship[] }): JSX.Element => {
  const { data: session } = useSession()
  const [ship, setShip] = useState<Ship | null>(null)

  const selectShipHandler = (id: string) => {
    const ship = ships.find((ship) => ship.id === id)
    setShip(ship || null)
  }
  return (
    <Layout>
      <p>
        Signed in as {session?.user.name || null}{' '}
        <Link href="/api/auth/signout"><a >Sign out</a></Link>
      </p>
      <Grid.Container gap={2} direction="column">
        <Grid xs={12}>
          <ShipSelector ships={ships} selectShipHandler={selectShipHandler} />
        </Grid>
        {ship ? (
          <>
            <Grid xs={12}>
              <ShipInfo ship={ship} />
            </Grid>
            <Grid xs={12}>
              <RecordList ship={ship} />
            </Grid>
          </>
        ) : null}
      </Grid.Container>
    </Layout>
  )
}

export default DashboardPage
