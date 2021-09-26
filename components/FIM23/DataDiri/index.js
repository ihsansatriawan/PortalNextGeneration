import React, { useEffect } from 'react';
import { object, string } from 'prop-types';
import { Form, Button, Icon, notification } from 'antd';
import { fetch } from '@helper/fetch';
import moment from 'moment';

import BasicInfo from './BasicInfo';
import Profesi from './Profesi';
import Social from './Social';
import Reference from './Reference';
import Keaktifan from './Keaktifan';
import Organisasi from './Organisasi';

import { styButtonSave, stySubmitWrapperButton } from './styles';

const DataDiri = (props) => {
  const { cookieLogin } = props;

  const saveBasicInfo = async (value) => {
    const response = await fetch({
      url: '/auth/profile/identity',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: {
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        emergencyPhone: value.emergencyPhone,
        ktpNumber: value.ktpNumber,
        photoUrl:
          typeof value.photoUrl === 'string'
            ? value.photoUrl
            : value.photoUrl.file.response.secure_url,
        religion: value.religion,
        bornPlace: value.bornPlace,
        bornDate: moment(value.bornDate || new Date(), 'YYYY-MM-DD'),
        address: value.address,
        cityAddress: value.cityAddress,
        provinceAddress: value.provinceAddress,
        gender: value.gender,
        bloodGroup: value.bloodGroup,
        hobby: value.hobby,
        institution: value.institution,
        occupation: value.occupation,
      },
    });

    const { status, message } = response.data;

    if (!status) {
      notification.error({ message: message });
    } else {
      notification.success({ message: message });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      saveBasicInfo(values);
      // if (!err) {
      //   console.log(values);
      //   console.log('values');
      // }
    });
  };

  useEffect(() => {}, []);

  return (
    <Form onSubmit={handleSubmitForm}>
      <BasicInfo {...props} />
      <Profesi {...props} />
      <Social {...props} />
      <Reference {...props} />
      <Keaktifan {...props} />
      <Organisasi {...props} />
      <div css={stySubmitWrapperButton}>
        <Form.Item>
          <Button
            size='large'
            css={styButtonSave}
            type='primary'
            htmlType='submit'
          >
            <Icon type='save' theme='filled' /> Simpan Perubahan
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: 'register' })(DataDiri);

DataDiri.propTypes = {
  form: object.isRequired,
  cookieLogin: string,
};

export default WrappedRegistrationForm;
