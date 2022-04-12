import { Button, Container, Input, Modal, Row, Text } from '@nextui-org/react'
import React, { useState } from 'react'

interface CallBackI {
  resolve: (result: boolean) => void
}
const useConfirmation = () => {
  const [visible, setVisible] = useState(false)
  const [callBack, setCallBack] = useState<CallBackI>({} as CallBackI)
  const [text, setText] = useState('')

  const getConfirmation = (inputText: string) => {
      setText(inputText)
    return new Promise<boolean>((resolve) => {
      openDialog(resolve)
    })
  }
  const openDialog = (resolve: (result: boolean) => void) => {
    setVisible(true)
    setCallBack({
      resolve,
    })
  }

  const resolveHandler = (result: boolean) => {
    setVisible(false)
    callBack.resolve(result)
  }
  function AskConfirmationModal() {

    const closeHandler = (accept: boolean) => {
      resolveHandler(accept)
    }

    return (
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={() =>closeHandler(false)}>
        <Modal.Header>
          <Container alignContent="center">
            <Text b size={24}>
              {text}
            </Text>
          </Container>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() =>closeHandler(false)}>
            Peruuta
          </Button>
          <Button auto onClick={() =>closeHandler(true)}>
            Kyllä
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return { AskConfirmationModal, getConfirmation }
}

export default useConfirmation
