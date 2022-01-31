import { Button, Col, Modal, Row, Text } from '@nextui-org/react'
import React from 'react'
import { Ship } from '../../../../../lib/db/entity/Ship'

interface Props {
  visible: boolean
  closeHandler: () => void
  ship: Ship | null
}

interface Property {
  name: string
  value: string | number
}

const ShipModal = ({ visible, closeHandler, ship }: Props): JSX.Element | null => {
  if (!ship) return null

  const properties: Property[] = [
    {
      name: 'Omistaja',
      value: ship.owner,
    },
    {
      name: 'Laivanisäntä',
      value: ship.shipmaster,
    },
    {
      name: 'Tunnuskirjaimet',
      value: ship.idLetters,
    },
    {
      name: 'Imo-nro',
      value: ship.imo,
    },
    {
      name: 'Bruttovetoisuus',
      value: ship.gt,
    },
    {
      name: 'Teho',
      value: ship.power,
    },
    {
      name: 'Pituus',
      value: ship.length,
    },
    {
      name: 'Kansallisuus',
      value: ship.nationality,
    },
    {
      name: 'Kotipaikka',
      value: ship.home,
    },
    {
      name: 'Osoite',
      value: ship.address,
    },
    {
      name: 'Liikennealue',
      value: ship.area,
    },
  ]

  return (
    <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text h2 id="modal-title" size={23}>
          {ship.name}
        </Text>
      </Modal.Header>
      <Modal.Body css={{ overflowY: 'none' }}>
        {properties.map((property, i) => (
          <Row key={i} gap={1}>
            <Col>
              <Text b>{property.name}</Text>
            </Col>
            <Col>
              <Text>{property.value}</Text>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Sulje
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShipModal
