import React from 'react';
import { RecordFormData } from '../../../types';
import RecordForm from './RecordForm';

interface Props {
  
}

const RecordPage = (props : Props): JSX.Element => {
const sendForm = (data: RecordFormData) => {
  
}

  return (
    <>
      <RecordForm sendForm={sendForm}/>
    </>
  );
};

export default RecordPage;
