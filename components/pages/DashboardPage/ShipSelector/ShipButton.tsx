import { Button } from '@nextui-org/react';
import React from 'react';
import { Ship } from '../../../../lib/db/entity/Ship';

interface Props {
  ship: Ship;
  selectShip: (shipId : string) => void
}

const ShipButton = ({ship, selectShip} : Props): JSX.Element => {
  return (
    <>
      <Button onClick={() => selectShip(ship.id)}>{ship}</Button>
    </>
  );
};

export default ShipButton;
