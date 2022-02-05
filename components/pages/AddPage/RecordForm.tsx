import { Button, Col, Grid, Input, Row, Text, Textarea } from '@nextui-org/react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { RecordFormData } from '../../../types/types'

interface Props {
  sendForm: (data: RecordFormData) => void
}

const schema = yup
  .object({
    firstName: yup.string().required('Nimi vaaditaan'),
    lastName: yup.string().required('Nimi vaaditaan'),
    reason: yup.string().required('Tehtävä vaaditaan'),
    date: yup.date().required('Päivä vaaditaan'),
    info: yup.string().default(''),
  })
  .required()

const RecordForm = ({ sendForm }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecordFormData>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<RecordFormData> = (data) => sendForm(data)
  return (
    <Grid.Container gap={2} direction="column">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Input
            bordered
            css={{ w: '100%' }}
            label="Etunimi*"
            color="default"
            {...register('firstName')}
            autoComplete='given-name'
            helperColor={'error'}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid>
          <Input
            bordered
            css={{ w: '100%' }}
            label="Sukunimi*"
            color="default"
            {...register('lastName')}
            autoComplete='family-name"'
            helperColor={'error'}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid>
          <Input
            css={{ w: '100%' }}
            bordered
            label="Päivä*"
            color="default"
            type="date"
            {...register('date')}
            initialValue={new Date().toISOString().substring(0, 10)}
            helperColor={'error'}
            helperText={errors.date?.message}
          />
        </Grid>
        <Grid>
          <Input
            bordered
            css={{ w: '100%' }}
            label="Syy*"
            color="default"
            {...register('reason')}
            helperColor={'error'}
            helperText={errors.reason?.message}
          />
        </Grid>
        <Grid>
          <Textarea
            bordered
            css={{ w: '100%' }}
            label="Lisätiedot"
            color="default"
            {...register('info')}
            helperColor={'error'}
            helperText={errors.info?.message}
          />
        </Grid>

        <Grid>
          <Button size={'md'} color="primary" rounded type="submit" css={{ w: '100%' }}>
            Lähetä
          </Button>
        </Grid>
      </form>
    </Grid.Container>
  )
}

export default RecordForm
