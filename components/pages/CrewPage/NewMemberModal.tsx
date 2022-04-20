import { Button, Input, Modal, Spacer, Text } from '@nextui-org/react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CrewMemberFormData } from '../../../types/types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface Props {
  bindings: {
    open: boolean
    onClose: () => void
  }
  setVisible: Dispatch<SetStateAction<boolean>>
  sendHandler: (formData: CrewMemberFormData) => void
  newMember?: CrewMemberFormData | null
}
const schema = yup
  .object({
    firstName: yup.string().required('Nimi vaaditaan'),
    lastName: yup.string().required('Nimi vaaditaan'),
    role: yup.string().required('Toimi vaaditaan'),
    socialSecurityNumber: yup.string().required('Henkilötunnus vaaditaan').length(11, 'Henkilötunnuksen pitää olla 11 merkkiä pitkä'),

  })
  .required()

const NewMemberModal = ({ bindings, setVisible, sendHandler, newMember }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CrewMemberFormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if(newMember){
    setValue('firstName', newMember?.firstName)
    setValue('lastName', newMember?.lastName)
    setValue('socialSecurityNumber', newMember?.socialSecurityNumber)
    }
  }, [newMember])

  const onSubmit: SubmitHandler<CrewMemberFormData> = (data, e) =>{
    sendHandler(data)
    reset()
    setVisible(false)
  } 
  const onClose = () => {
    reset()
    setVisible(false)
  }
  
  return (
    <Modal closeButton aria-labelledby="modal-title" {...bindings}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" h2 size={22}>
            Lisää miehistön jäsen
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            label="Etunimi"
            {...register('firstName')}
            helperColor={'error'}
            helperText={errors.firstName?.message}
          />
           <Spacer y={0}/>
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            label="Sukunimi"
            {...register('lastName')}
            helperColor={'error'}
            helperText={errors.lastName?.message}
          />
           <Spacer y={0}/>
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            label="Toimi"
            {...register('role')}
            helperColor={'error'}
            helperText={errors.role?.message}
          />
           <Spacer y={0}/>
          <Input
            clearable
            bordered
            fullWidth
            size="lg"
            maxLength={11}
            label="Henkilötunnus"
            {...register('socialSecurityNumber')}
            helperColor={'error'}
            helperText={errors.socialSecurityNumber?.message}
          />
           <Spacer y={0}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" type='reset' onClick={onClose}>
            Sulje
          </Button>
          <Button auto type="submit">
            Lisää
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default NewMemberModal
