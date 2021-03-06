import { Button, Col, Grid, Input, Modal, Row, Spacer, Text } from '@nextui-org/react'
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
  crewMember: CrewMemberFormData | undefined
  deleteHandler: () => void
}
const schema = yup
  .object({
    firstName: yup.string().required('Nimi vaaditaan'),
    lastName: yup.string().required('Nimi vaaditaan'),
    role: yup.string().required('Toimi vaaditaan'),
    socialSecurityNumber: yup.string().required('Henkilötunnus vaaditaan').length(11, 'Henkilötunnuksen pitää olla 11 merkkiä pitkä'),
  })
  .required()

const EditMemberModal = ({
  crewMember,
  bindings,
  setVisible,
  sendHandler,
  deleteHandler
}: Props): JSX.Element | null => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CrewMemberFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<CrewMemberFormData> = (data, e) => {
    reset()
    setVisible(false)
    sendHandler(data)
  }
  const onClose = () => {
    reset()
    setVisible(false)
  }
  const onDelete = () => {
    deleteHandler()
    setVisible(false)
  }
  
  
  
  useEffect(() => {
    if(crewMember){
    setValue('firstName', crewMember?.firstName)
    setValue('lastName', crewMember?.lastName)
    setValue('role', crewMember?.role)
    setValue('socialSecurityNumber', crewMember?.socialSecurityNumber)
    }
  }, [crewMember])
  
  if (!crewMember) return null

  return (
    <Modal closeButton aria-labelledby="modal-title" {...bindings}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" h2 size={22}>
            Muokkaa miehistön jäsentä
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
          <Spacer y={0} />
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
          <Spacer y={0} />
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
          <Spacer y={0} />
          <Input.Password
            bordered
            fullWidth
            size="lg"
            maxLength={11}
            label="Henkilötunnus"
            {...register('socialSecurityNumber')}
            helperColor={'error'}
            helperText={errors.socialSecurityNumber?.message}
          />
          <Spacer y={0} />
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container justify="space-between">
            <Grid>
              <Button auto flat color="error" type="reset" onClick={onClose}>
                Sulje
              </Button>
            </Grid>
            <Grid>
              <Grid.Container direction="row" justify="space-between">
                <Grid>
                  <Button auto type="button" color="error" onClick={onDelete}>
                    Poista
                  </Button>
                </Grid>
                <Spacer x={0.3} />
                <Grid>
                  <Button auto type="submit">
                    Tallenna
                  </Button>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditMemberModal
