import { Button, Container, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Container
      fluid
      display="flex"
      justify="center"
      alignItems="center"
      direction='column'
      css={{ minHeight: '100vh', minWidth: '100vw'}}
    >
      <Container fluid>
        <Row>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $blue500 -70%, #00BFFF 50%',
            }}
            weight="bold"
          >
            Purseri
          </Text>
        </Row>
        <Row>
          <Button auto color="gradient" rounded bordered>
            Skannaa koodi
          </Button>
        </Row>
      </Container>
    </Container>
  )
}

export default Home
