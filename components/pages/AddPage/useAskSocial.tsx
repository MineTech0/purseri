import { Button, Container, Input, Modal, Spacer, Text } from '@nextui-org/react';
import { useState } from 'react';

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
    const [lengthError, setLengthError] = useState('')

    const closeHandler = (submit: boolean) => {
      
      if (socialNumber.length !== 11 && submit) {
        setLengthError('Henkilötunnuksen pitää olla 11 merkkiä pitkä')
      } else if(!submit){
        setVisible(false)
      }else {
        resolveHandler(socialNumber)
      }
    }

    return (
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={()=> closeHandler(false)}>
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
              minLength={11}
              maxLength={11}
              onChange={(e) => {
                setSocialNumber(e.target.value)
              }}
              color="primary"
              size="lg"
              placeholder="Henkilötunnus"
              helperColor={'error'}
              helperText={lengthError}
            />
            <Spacer/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => closeHandler(false)}>
            Peruuta
          </Button>
          <Button auto onClick={() => closeHandler(true)}>
            Lähetä
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return { AskModal, getNumber }
}

export default useAskSocial
