import { Button, Collapse, Container, Modal, Row, Text } from '@nextui-org/react'
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'
import { convertDate } from '../../../../../lib/utils'

interface Props {
  bindings: {
    open: boolean
    onClose: () => void
  }
  crewMember: CrewMember | null
}

const MemberModal = ({ bindings, crewMember }: Props): JSX.Element | null => {
  if (!crewMember) return null

  return (
    <Modal closeButton aria-labelledby="modal-title" {...bindings}>
      <Modal.Header>
        <Container>
          <Row>
            <Text h2 id="modal-title" size={32}>
              {crewMember.firstName} {crewMember.lastName}
            </Text>
          </Row>
          <Row>
            <Text size={18}>{crewMember.role}</Text>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body css={{ overflowY: 'clip' }}>
        <Collapse.Group splitted>
          {crewMember.records.map((record) => (
            <Collapse
              key={record.id}
              subtitle={record.reason}
              title={convertDate(record.date)}
              
            >
                {record.info !== '' ? <Text>{record.info}</Text> : <Text span>Ei infoa</Text> }
              
            </Collapse>
          ))}
        </Collapse.Group>
      </Modal.Body>
    </Modal>
  )
}

export default MemberModal
