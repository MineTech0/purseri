import { useState } from 'react'


interface ModalStateI {
    [key: string]: {
      visible: boolean;
      closeHandler: () => void;
    };
  }
const useModals = (modalNames: string[]) => {
  const [modalStates, setModalStates] = useState<ModalStateI>()
  const onClose = () => {}
}
export default useModals
