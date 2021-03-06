import { Grid, Text, useModal } from '@nextui-org/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useResult } from '../../../hooks/useResult'
import { Ship } from '../../../lib/db/entity/Ship'
import ShipCrewMemberService from '../../../services/ShipCrewMemberService'
import { CrewMemberFormData } from '../../../types/types'
import ShipInfo from '../../common/ShipInfo'
import Layout from '../../Layout'
import CrewActionBar from './CrewActionBar'
import CrewList from './CrewList'
import NewMemberModal from './NewMemberModal'

interface Props {
  ship: Ship
  newMember: CrewMemberFormData | null
}

const CrewPage = ({ ship, newMember }: Props): JSX.Element => {
  const { setVisible, bindings } = useModal()
  const [ResultBannerWrapper, setResult] = useResult()
  const router = useRouter()

  useEffect(() => {
    if (newMember) {
      setVisible(true)
    }
  }, [])

  const newCrewMember = (formData: CrewMemberFormData) => {
    ShipCrewMemberService.addCrewMember(ship.id, formData)
      .then((data) => {
        ship.crew.push(data)
        setResult({
          type: 'success',
          message: 'Miehistön jäsen lisätty',
        })
        router.replace({
          pathname: '/dashboard/ship/[shipId]/crew',
          query: { shipId: ship.id }
        })
      })
      .catch((error) => {
        setResult({
          type: 'error',
          message: error.response.data,
        })
      })
  }

  const editCrewMember = (memberId: string, formData: CrewMemberFormData) => {
    ShipCrewMemberService.editCrewMember(ship.id, memberId, formData)
      .then((data) => {
        ship.crew = ship.crew.map((member) => (member.id === data.id ? data : member))
        setResult({
          type: 'success',
          message: 'Muokkaus onnistui',
        })
      })
      .catch((error) => {
        setResult({
          type: 'error',
          message: error.response.data,
        })
      })
  }

  const deleteCrewMember = (memberId: string) => {
    ShipCrewMemberService.deleteCrewMember(ship.id, memberId)
      .then((data) => {
        ship.crew = ship.crew.filter((member) => member.id !== memberId)
        setResult({
          type: 'success',
          message: 'Poisto onnistui',
        })
      })
      .catch((error) => {
        setResult({
          type: 'error',
          message: error.response.data,
        })
      })
  }

  return (
    <>
    <Head>
        <title>{`${ship.name} | Miehistö` }</title>
        <meta property="og:title" content={`${ship.name} | Miehistö`} key="title" />
      </Head>
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
              <ResultBannerWrapper />
            </Grid>
            <Grid xs={12}>
              <CrewList
                crew={ship.crew}
                editCrewMember={editCrewMember}
                deleteCrewMember={deleteCrewMember}
              />
            </Grid>
          </>
        ) : null}
      </Grid.Container>
      <NewMemberModal
        bindings={bindings}
        setVisible={setVisible}
        sendHandler={newCrewMember}
        newMember={newMember}
      />
    </Layout>
    </>
  )
}

export default CrewPage
