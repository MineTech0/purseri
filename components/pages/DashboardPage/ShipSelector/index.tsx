import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Ship } from '../../../../lib/db/entity/Ship';
import AddShipButton from './AddShipButton';
import ShipButton from './ShipButton';

interface Props {
  ships: Ship[]
}

const ShipSelector = ({ships} : Props): JSX.Element => {
  const router = useRouter()
    const addShipHandler = () => {
      router.push('dashboard/ship/new')
    }
    const selectShipHandler = () => {
      
    }
    

    if(ships.length === 0){
        return (
            <AddShipButton fullWidth={true} addShip={addShipHandler}/>
        )
    }
  return (
    <Button.Group>
        {ships.map((ship) => <ShipButton key={ship.id} ship={ship} selectShip={selectShipHandler}/>)}
        <AddShipButton addShip={addShipHandler}/>
    </Button.Group>
  );
};

export default ShipSelector;
