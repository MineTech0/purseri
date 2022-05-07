import { Card, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';
import Center from './Center';

interface Props {
  type: 'success' | 'error';
  message: string;
}

const ResultPage = ({ type, message } : Props): JSX.Element => {
  return (
    <>
    <Head>
    <title>{`${message}`}</title>
    </Head>
    <Center>
      <Card color={type} css={{ mw: "200px",mh:'200px' }}>
          <Text className='result-message' css={{ fontWeight: '$bold', color: '$white', textAlign:'center' }} transform="capitalize">
            {message}
          </Text>
        </Card>
    </Center>
    </>
  );
};

export default ResultPage;
