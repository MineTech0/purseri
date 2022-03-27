import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ShipService from '../../../services/ShipService'
import { FormResult, ShipFormData } from '../../../types/types'
import ResultPage from '../../common/ResultPage'
import Layout from '../../Layout'
import NewShipForm from './NewShipForm'

interface Props {}

const NewShipPage = (props: Props): JSX.Element => {
  const [result, setResult] = useState<FormResult>()
  const router = useRouter()
  const sendFormHandler = (data: ShipFormData) => {
    ShipService.create(data)
      .then(() => {
        setResult({
          type: 'success',
          message: 'Uusi alus lisätty',
        })
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000);
      })
      .catch((error: string) => {
        setResult({
          type: 'error',
          message: error.toString(),
        })
      })
  }

  if (result) return <ResultPage message={result.message} type={result.type} />

  return (
    <Layout>
      <NewShipForm sendForm={sendFormHandler} />
    </Layout>
  )
}

export default NewShipPage
