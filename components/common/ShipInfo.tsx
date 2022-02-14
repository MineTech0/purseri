import { Card, Text } from '@nextui-org/react'
import React from 'react'
import { Ship } from '../../lib/db/entity/Ship'

interface Props {
  ship: Ship | null
}

interface ClickableProps extends Props {
  clickable?: boolean
  onClick?: () => void
}

const ShipInfo = ({
  ship,
  clickable = false,
  onClick = () => {},
}: ClickableProps): JSX.Element | null => {
  if (!ship) return null
  return (
    <Card clickable={clickable} hoverable onClick={(_e) => onClick()}>
      <Card.Header>
        <Text size={20} b>
          {ship.name}
        </Text>
      </Card.Header>
      <Card.Body>
        <Text>
          <b>Omistaja: </b> {ship.owner}
        </Text>
        <Text>
          <b>Laivanisäntä: </b> {ship.shipmaster}
        </Text>
      </Card.Body>
    </Card>
  )
}

export default ShipInfo
