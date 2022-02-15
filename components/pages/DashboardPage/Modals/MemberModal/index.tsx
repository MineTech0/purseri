import { Button, Modal, Text } from '@nextui-org/react';
import { CrewMember } from '../../../../../lib/db/entity/CrewMember'

interface Props {
  visible: boolean
  closeHandler: () => void
  crewMember: CrewMember | null
}

const MemberModal = ({ visible, closeHandler, crewMember }: Props): JSX.Element | null => {
  if (!crewMember) return null

  return (
    <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text h2 id="modal-title" size={23}>
          {crewMember.firstName} {crewMember.lastName}
        </Text>
        <Text b size={18}>
          {crewMember.role}
        </Text>
      </Modal.Header>
      <Modal.Body css={{ overflowY: 'clip' }}>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={closeHandler}>
          Sulje
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MemberModal
