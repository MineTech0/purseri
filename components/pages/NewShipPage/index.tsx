import React from 'react';
import { ShipFormData } from '../../../types';
import Layout from '../../Layout';
import NewShipForm from './NewShipForm';

interface Props {
  
}

const NewShipPage = (props : Props): JSX.Element => {
    const sendFormHandler = (data: ShipFormData) => {
      
    }
    
  return (
    <Layout>
      <NewShipForm sendForm={sendFormHandler}/>
    </Layout>
  );
};

export default NewShipPage;
