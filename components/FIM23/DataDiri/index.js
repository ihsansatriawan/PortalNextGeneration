import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';
import { Form, Button, Icon, notification, message } from 'antd';
import { fetch } from '@helper/fetch';
import moment from 'moment';
import { logout } from '@helper/googleSession';
import Router from 'next/router';

import BasicInfo from './BasicInfo';
import Profesi from './Profesi';
import Social from './Social';
import Reference from './Reference';
import Keaktifan from './Keaktifan';
import Organisasi from './Organisasi';

import { styButtonSave, stySubmitWrapperButton } from './styles';

const DataDiri = (props) => {
  const { cookieLogin } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const { setFieldsValue } = props.form;

  const redirectAfterSuccessLogout = () => {
    message.success('Berhasil Logout');
    Router.push('/');
  };

  const fetchDataProfile = async () => {
    const { cookieLogin } = props;

    setIsLoading(true);

    try {
      const response = await fetch({
        url: '/auth/profile',
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.data.status || false;

      if (!status) {
        setDataUser({});
      } else {
        const responseData = response.data.data;
        const { Identity } = responseData;

        if (Identity) {
          setDataUser(Identity);
          setFieldsValue({
            firstName: Identity.firstName,
            lastName: Identity.lastName,
            bornPlace: Identity.bornPlace,
            bornDate: moment(Identity.bornDate || new Date(), 'YYYY-MM-DD'),
            gender: Identity.gender,
            cityAddress: Identity.cityAddress,
            provinceAddress: Identity.provinceAddress,
            address: Identity.address,
            bloodGroup: Identity.bloodGroup,
            religion: Identity.religion,
            hobby: Identity.hobby,
            phone: Identity.phone,
            emergencyPhone: Identity.emergencyPhone,
            photoUrl: Identity.photoUrl,
            ktpNumber: Identity.ktpNumber,
            institution: Identity.institution,
            occupation: Identity.occupation,
          });
        }
      }

      setIsLoading(false);
    } catch (error) {
      // Jika error auto logout
      logout({
        onLogoutSuccess: () => {
          redirectAfterSuccessLogout();
        },
      });
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchDataProfile();
  }, []);

  return (
    <Form onSubmit={handleSubmitForm}>
      <BasicInfo
        {...props}
        isLoading={isLoading}
        dataUser={dataUser}
        setDataUser={setDataUser}
      />
      <Profesi {...props} isLoading={isLoading} dataUser={dataUser} />
      <Social {...props} isLoading={isLoading} />
      <Reference {...props} isLoading={isLoading} />
      <Keaktifan {...props} isLoading={isLoading} />
      <Organisasi {...props} isLoading={isLoading} />
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
