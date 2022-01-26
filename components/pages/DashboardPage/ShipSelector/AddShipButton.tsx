import { Button } from '@nextui-org/react'
import React from 'react'

interface Props {
  addShip: () => void
  fullWidth?: boolean
}

const AddShipButton = ({ addShip, fullWidth }: Props): JSX.Element => {
  return (
    <>
      <Button
        size={fullWidth ? 'lg' : 'md'}
        css={fullWidth ? { width: '100%' } : {}}
        onClick={() => addShip()}
      >
        Lisää alus
      </Button>
    </>
  )
}

export default AddShipButton
