import { Button, Col, Grid, Input, Modal, Row, Spacer, Text } from '@nextui-org/react'
import React, { Dispatch, SetStateAction } from 'react'
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
}
const schema = yup
  .object({
    firstName: yup.string().required('Nimi vaaditaan'),
    lastName: yup.string().required('Nimi vaaditaan'),
    role: yup.string().required('Toimi vaaditaan'),
    socialSecurityNumber: yup.string().required('Henkilötunnus vaaditaan'),
  })
  .required()

const EditMemberModal = ({
  crewMember,
  bindings,
  setVisible,
  sendHandler,
}: Props): JSX.Element | null => {
  const {
    register,
    handleSubmit,
    reset,
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
            value={crewMember.firstName}
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
            value={crewMember.lastName}
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
            value={crewMember.role}
            helperColor={'error'}
            helperText={errors.role?.message}
          />
          <Spacer y={0} />
          <Input.Password
            bordered
            fullWidth
            size="lg"
            label="Henkilötunnus"
            {...register('socialSecurityNumber')}
            value={crewMember.socialSecurityNumber}
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
              <Grid.Container direction='row' justify='space-between'>
                <Grid>
                  <Button auto type="button" color="error">
                    Poista
                  </Button>
                </Grid>
                <Spacer x={0.3}/>
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
