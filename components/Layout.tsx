import { Container } from '@nextui-org/react';
import React from 'react';

interface Props {
  children: JSX.Element
}

const Layout = (props : Props): JSX.Element => {
  return (
    <Container
      fluid
      css={{ minHeight: '100vh'}}
    >
      {props.children}
    </Container>
  );
};

export default Layout;
