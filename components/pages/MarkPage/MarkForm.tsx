import { Button, Grid, Input, Text } from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {}
type Inputs = {
  name: string
  job: string
  hours: number
}

const schema = yup
  .object({
    name: yup.string().required('Nimi vaaditaan'),
    job: yup.string().required('Tehtävä vaaditaan'),
    hours: yup.number().typeError('Tuntien pitää olla numero').positive('Tuntien pitää olla positiivinen numero').required('Tunnit vaaditaan'),
  })
  .required()

const MarkForm = (props: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  return (
    
      <Grid.Container gap={4} direction='column' alignItems='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid md={12}>
          <Text h3>Merkkaa meripäivät</Text>
        </Grid>
        <Grid xs={12}>
          <Input
            bordered
            label="Nimi"
            color="default"
            width="300px"
            {...register('name')}
            helperColor={'error'}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            bordered
            label="Tehtävä"
            color="default"
            width="300px"
            {...register('job')}
            helperColor={'error'}
            helperText={errors.job?.message}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            bordered
            label="Aika"
            color="default"
            width="300px"
            labelRight="tuntia"
            type='number'
            {...register('hours')}
            helperColor={'error'}
            helperText={errors.hours?.message}
          />
        </Grid>
        <Grid>
          <Button width="300px" color="primary" rounded type="submit">
            Lähetä
          </Button>
        </Grid>
        </form>
      </Grid.Container>
  )
}

export default MarkForm
