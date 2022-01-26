import { Card, Text } from '@nextui-org/react';
import React from 'react';

interface Props {
  
}

const ShipInfo = (props : Props): JSX.Element => {
  return (
    <Card>
        <Card.Header>
          <Text size={20} b>M/S Lola3</Text>
        </Card.Header>
        <Card.Body>
          <Text>
            <b>Omistaja: </b> Ekin partio
          </Text>
          <Text>
            <b>Laivanisäntä: </b> Ruusa Laukkanen
          </Text>
        </Card.Body>
    </Card>
  );
};

export default ShipInfo;
