import React, { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import Container from '@components/Recruiter';
import ProfileContextProvider from '@context/profileContext';
import { notification } from 'antd';
import { removeCookie } from '@helper/Cookie';
import CONSTANT from '@constant';
import Router from 'next/router';
import { string } from 'prop-types';

const Recruiter = (props) => {
  const [loading] = useState(false);

  // const openNotificationWithIcon = (type) => {
  //   notification[type]({
  //     message: 'Anda harus login terlebih dahulu',
  //   });
  // };

  // const redirectNonLogin = () => {
  //   removeCookie(CONSTANT.TOKEN_NAME);
  //   Router.push('/');
  //   openNotificationWithIcon('error');
  // };

  // const checkSession = async () => {
  //   const { cookieLogin } = props;

  //   try {
  //     const response = await fetch({
  //       url: '/auth/checksession',
  //       method: 'post',
  //       data: {
  //         token: cookieLogin,
  //       },
  //     });

  //     const status = response.data.status || false;

  //     if (!status) {
  //       return redirectNonLogin();
  //     }
  //   } catch (error) {
  //     console.log('error: ', error);

  //     redirectNonLogin();
  //   }
  // };

  // useEffect(() => {
  //   checkSession();
  // }, []);

  return loading ? (
    <Skeleton />
  ) : (
    <ProfileContextProvider {...props}>
      <Container {...props} />
    </ProfileContextProvider>
  );
};

Recruiter.propTypes = {
  cookieLogin: string,
};

export default Recruiter;
