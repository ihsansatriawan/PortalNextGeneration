import React from 'react';
import { object } from 'prop-types';

import { Form } from 'antd';

import BasicInfo from './BasicInfo';
import Profesi from './Profesi';
import Social from './Social';
import Reference from './Reference';
import Keaktifan from './Keaktifan';
import Organisasi from './Organisasi';

const DataDiri = (props) => {
  // const {
  //   getFieldDecorator,
  //   // getFieldsError,
  //   // getFieldError,
  //   // isFieldTouched,
  // } = props.form;

  return (
    <>
      <BasicInfo {...props} />
      <Profesi {...props} />
      <Social {...props} />
      <Reference {...props} />
      <Keaktifan {...props} />
      <Organisasi {...props} />
    </>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'register' })(DataDiri);

DataDiri.propTypes = {
  form: object.isRequired,
};

export default WrappedRegistrationForm;
