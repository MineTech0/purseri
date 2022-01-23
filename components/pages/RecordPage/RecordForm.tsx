import { Button, Grid, Input, Text } from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RecordFormData } from '../../../types'

interface Props {
  sendForm: (data: RecordFormData) => void
}

const schema = yup
  .object({
    name: yup.string().required('Nimi vaaditaan'),
    reason: yup.string().required('Tehtävä vaaditaan'),
    date: yup.date().required('Päivä vaaditaan'),
    info: yup.string().notRequired()
  })
  .required()

const RecordForm = (props: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecordFormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<RecordFormData> = (data) => console.log(data)
  return (
    
      <Grid.Container gap={4} direction='column' alignItems='center' justify='center'>
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
            label="Päivä"
            color="default"
            width="300px"
            type='date'
            {...register('date')}
            value={new Date().toISOString().substring(0, 10)}
            helperColor={'error'}
            helperText={errors.date?.message}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            bordered
            label="Syy"
            color="default"
            width="300px"
            {...register('reason')}
            helperColor={'error'}
            helperText={errors.reason?.message}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            bordered
            label="Lisätiedot"
            color="default"
            width="300px"
            {...register('info')}
            helperColor={'error'}
            helperText={errors.info?.message}
          />
        </Grid>
      
        <Grid>
          <Button size={'md'} color="primary" rounded type="submit">
            Lähetä
          </Button>
        </Grid>
        </form>
      </Grid.Container>
  )
}

export default RecordForm
