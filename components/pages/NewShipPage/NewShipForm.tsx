import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Col,
  Container,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ShipFormData } from '../../../types/types'

interface Props {
  sendForm: (data: ShipFormData) => void
}
const schema = yup
  .object({
    name: yup.string().required('Nimi vaaditaan'),
    owner: yup.string().required('Omistaja vaaditaan'),
    shipmaster: yup.string().required('Laivanisäntä vaaditaan'),
  })
  .required()

const NewShipForm = ({ sendForm }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShipFormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<ShipFormData> = (data) => sendForm(data)
  return (
    <Container fluid>
        <Row css={{textAling:'center'}}>
            <Text css={{textAling:'center'}} b size={30}>Lisää alus</Text>
        </Row>
        <Spacer y={1}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Input
            bordered
            label="Nimi*"
            color="default"
            width="100%"
            {...register('name')}
            helperColor={'error'}
            helperText={errors.name?.message}
          />
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            bordered
            label="Omistaja*"
            width="100%"
            color="default"
            {...register('owner')}
            helperColor={'error'}
            helperText={errors.owner?.message}
          />
        </Row>
        <Spacer y={1} />
        <Row>
          <Input
            bordered
            label="Laivanisäntä*"
            width="100%"
            color="default"
            {...register('shipmaster')}
            helperColor={'error'}
            helperText={errors.shipmaster?.message}
          />
        </Row>
        <Spacer y={3} />
        <Row>
          <Button size={'md'} color="primary" rounded type="submit" css={{w:'100%'}}>
            Lisää
          </Button>
        </Row>
      </form>
    </Container>
  )
}

export default NewShipForm
