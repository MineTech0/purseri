import { Container, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
  <Container fluid display='flex' justify="center" alignItems="center" css={{minHeight: '100vh'}}>
  <Text
    h1
    size={60}
    css={{
      textGradient: '45deg, $blue500 -70%, #00BFFF 50%'
    }}
    weight="bold"
  >
    Purseri
  </Text>
</Container>
  )
}

export default Home
