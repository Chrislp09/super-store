import React from 'react';
import Header from '../components/Header';

const Contact = () => (
  <>
    <Header 
        title={"Contáctanos"}
        description={ `Puedes enviarnos un correo electrónico a ${process.env.REACT_APP_CONTACT_MAIL}`}
      />
  </>
);

export default Contact;