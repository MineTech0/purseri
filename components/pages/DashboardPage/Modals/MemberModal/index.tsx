import { Collapse, Container, Modal, Row, Spacer, Text } from '@nextui-org/react'
import DeleteButton from 'components/common/DeleteButton'
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'
import { convertDate } from '../../../../../lib/utils'

interface Props {
  bindings: {
    open: boolean
    onClose: () => void
  }
  crewMember: CrewMember | null
  deleteHandler: (id: string) => void
}

const MemberModal = ({ bindings, crewMember, deleteHandler }: Props): JSX.Element | null => {
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
            <>
              <Row align="center">
                <Collapse
                  key={record.id}
                  subtitle={record.reason}
                  title={convertDate(record.date)}
                  css={{ width: '100%' }}
                  showArrow={record.info !== ''}
                >
                  {record.info !== '' ? <Text>{record.info}</Text> : <Text span>Ei infoa</Text>}
                </Collapse>
                <Spacer />
                <DeleteButton
                  onClick={() => {
                    deleteHandler(record.id)
                  }}
                />
              </Row>
            </>
          ))}
        </Collapse.Group>
      </Modal.Body>
    </Modal>
  )
}

export default MemberModal
