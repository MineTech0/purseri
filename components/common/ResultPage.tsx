import { Card, Text } from '@nextui-org/react';
import React from 'react';
import Center from './Center';

interface Props {
  type: 'success' | 'error';
  message: string;
}

const ResultPage = ({type, message} : Props): JSX.Element => {
  return (
    <Center>
      <Card color={type} css={{ mw: "200px",mh:'200px' }}>
          <Text css={{ fontWeight: '$bold', color: '$white', textAlign:'center' }} transform="capitalize">
            {message}
          </Text>
        </Card>
    </Center>
  );
};

export default ResultPage;
