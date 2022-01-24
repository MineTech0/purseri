import { Container } from '@nextui-org/react'
import React from 'react'

interface Props {
  children: JSX.Element
}

const Center = (props: Props): JSX.Element => {
  return (
    <Container
      fluid
      display="flex"
      justify="center"
      alignItems="center"
      direction="column"
      css={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      {props.children}
    </Container>
  )
}

export default Center
