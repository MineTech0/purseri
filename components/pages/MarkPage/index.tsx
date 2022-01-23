import React from 'react';
import { MarkFormData } from '../../../types';
import MarkForm from './MarkForm';

interface Props {
  
}

const MarkPage = (props : Props): JSX.Element => {
const sendForm = (data: MarkFormData) => {
  
}

  return (
    <>
      <MarkForm sendForm={sendForm}/>
    </>
  );
};

export default MarkPage;
