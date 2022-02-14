import { Col, Row, Text } from '@nextui-org/react'
import React from 'react'
import { CrewMember } from '../../../lib/db/entity/CrewMember'
import { Plus } from 'react-iconly'
import PlusButton from '../../common/PlusButton'

interface Props {
  crew: CrewMember[]
  openModal: () => void
}

const CrewActionBar = ({ crew, openModal }: Props): JSX.Element => {
  return (
    <Row gap={1} justify="space-between">
      <Text b>Määrä: {crew.length}</Text>
      <PlusButton onClick={() => openModal()}/>
    </Row>
  )
}

export default CrewActionBar
