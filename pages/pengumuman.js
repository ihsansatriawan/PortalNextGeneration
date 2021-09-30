import React, { useState, useEffect } from 'react';
import Container from '@components/FIM23';
import { string } from 'prop-types';
import { Skeleton } from 'antd';
import { removeCookie } from '@helper/Cookie';
import CONSTANT from '@constant';
import Router from 'next/router';
import { notification } from 'antd';
import { fetch } from '@helper/fetch';

import ProfileContextProvider from '@context/profileContext';

const Pengumuman = (props) => {
  const [loading] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Anda harus login terlebih dahulu',
    });
  };

  const redirectNonLogin = () => {
    removeCookie(CONSTANT.TOKEN_NAME);
    Router.push('/');
    openNotificationWithIcon('error');
  };

  const checkSession = async () => {
    const { cookieLogin } = props;

    try {
      const response = await fetch({
        url: '/auth/checksession',
        method: 'post',
        data: {
          token: cookieLogin,
        },
      });

      const status = response.data.status || false;

      if (!status) {
        return redirectNonLogin();
      }
    } catch (error) {
      console.log('error: ', error);

      redirectNonLogin();
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return loading ? (
    <Skeleton />
  ) : (
    <ProfileContextProvider {...props}>
      <Container {...props} pengumuman={true} />
    </ProfileContextProvider>
  );
};

Pengumuman.propTypes = {
  cookieLogin: string,
};

export default Pengumuman;
