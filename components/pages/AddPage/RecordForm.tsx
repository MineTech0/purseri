import { Button, Card, Checkbox, Grid, Input, Radio, Text, Textarea, Link } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
    reason: yup.string().required('Syy vaaditaan'),
    date: yup
      .date()
      .required('Päivä vaaditaan')
      .typeError('Päivä vaaditaan'),
    info: yup.string().default(''),
    birthDate: yup.date().required('Syntymäpäivä vaaditaan').typeError('Syntymäpäivä vaaditaan'),
    privacy: yup.bool().default(false).oneOf([true], 'Hyväksy tietosuojaseloste'),
    acceptTrafi: yup.bool().default(false).oneOf([true], 'Hyväksy tietojen luovutus'),
  })
  .required()

const RecordForm = ({ sendForm }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
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
            label={'Etunimi*'}
            color="default"
            {...register('firstName')}
            autoComplete="given-name"
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
            label="Syntymäpäivä*"
            color="default"
            type="date"
            {...register('birthDate')}
            helperColor={'error'}
            helperText={errors.birthDate?.message}
          />
        </Grid>
        <Grid>
          <Input
            css={{ w: '100%' }}
            bordered
            label="Meripäivä*"
            color="default"
            type="date"
            {...register('date')}
            helperColor={'error'}
            helperText={errors.date?.message}
          />
        </Grid>
        <Grid>
          <Text size={14}>Syy*</Text>
          <Controller
            control={control}
            name="reason"
            render={({ field }) => {
              const { onChange, value } = field
              return (
                <Radio.Group css={{ w: '100%' }} size="sm" value={value}>
                  <Radio onChange={(e) => onChange(e.nativeEvent)} value="Kaupallinen ajo">
                    Kaupallinen ajo
                  </Radio>
                  <Radio onChange={(e) => onChange(e.nativeEvent)} value="Partioajo">
                    Partioajo
                  </Radio>
                  <Radio onChange={(e) => onChange(e.nativeEvent)} value="Talkoopäivä">
                    Talkoopäivä
                  </Radio>
                  <Text color="error">{errors.reason?.message}</Text>
                </Radio.Group>
              )
            }}
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
          <Controller
            control={control}
            name="privacy"
            render={({ field }) => {
              const { onChange, value } = field
              return (
                <>
                  <Checkbox css={{ w: '100%' }} size="sm" onChange={onChange} checked={value}>
                    <Text>
                      Olen lukenut ja hyväksyn{' '}
                      <Link href={'/privacy-policy.html'} target={'_blank'} css={{ marginLeft: 2 }}>
                        Tietosuojaselosteen
                      </Link>
                      <Text color="error">{errors.privacy?.message}</Text>
                    </Text>
                  </Checkbox>
                </>
              )
            }}
          />
        </Grid>
        <Grid>
          <Controller
            control={control}
            name="acceptTrafi"
            render={({ field }) => {
              const { onChange, value } = field
              return (
                <>
                  <Checkbox css={{ w: '100%' }} size="sm" onChange={onChange} checked={value}>
                    <Text>
                      Hyväksyn tietojeni luovutuksen Traficomille meripalveluilmoituksessa
                      <Text color="error">{errors.acceptTrafi?.message}</Text>
                    </Text>
                  </Checkbox>
                </>
              )
            }}
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
