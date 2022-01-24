import React, { useState } from 'react';
import RecordService from '../../../services/RecordService';
import { RecordFormData } from '../../../types';
import RecordForm from './RecordForm';
import ResultPage from './ResultPage';


const RecordPage = (): JSX.Element => {
  const [result, setResult] = useState<{type: 'success' | 'error'; message: string;}>()

const sendForm = (data: RecordFormData) => {
  RecordService.create(data).then(data => {
    setResult({
      type: 'success',
      message: 'Kiitos ilmoituksesta'
    })
  }).catch((error: any) => {
    setResult({
      type: 'error',
      message: error.toString()
    })
  })
}
if (result) return <ResultPage message={result.message} type={result.type} />

  return (
    <>
      <RecordForm sendForm={sendForm}/>
    </>
  );
};

export default RecordPage;
