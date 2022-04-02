import { Button, Container, Input, Modal, Row, Text } from '@nextui-org/react'
import React, { useState } from 'react'

interface CallBackI {
  resolve: (result: string) => void
}
const useAskSocial = () => {
  const [visible, setVisible] = useState(false)
  const [callBack, setCallBack] = useState<CallBackI>({} as CallBackI)

  const getNumber = () => {
    return new Promise<string>((resolve) => {
      openDialog(resolve)
    })
  }
  const openDialog = (resolve: (result: string) => void) => {
    setVisible(true)
    setCallBack({
      resolve,
    })
  }

  const resolveHandler = (result: string) => {
    setVisible(false)
    callBack.resolve(result)
  }
  function AskModal() {
    const [socialNumber, setSocialNumber] = useState('')

    const closeHandler = () => {
      resolveHandler(socialNumber)
    }

    return (
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Container alignContent="center">
            <Text b size={24}>
              Syötä henkilötunnuksesi
            </Text>

            <Text size={18}>
              Et kuulu laivan miehistöön joten tarvitsemme henkilötunnuksesi ilmoituksen tekemiseen.
            </Text>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            value={socialNumber}
            onChange={(e) => {
              setSocialNumber(e.target.value)
            }}
            color="primary"
            size="lg"
            placeholder="Henkilötunnus"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Peruuta
          </Button>
          <Button auto onClick={closeHandler}>
            Lähetä
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return { AskModal, getNumber }
}

export default useAskSocial