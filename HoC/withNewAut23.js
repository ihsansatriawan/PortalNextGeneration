import Router from 'next/router';
import CONSTANT from '@constant';
import { fetch } from '@helper/fetch';
import { logout } from '@helper/googleSession';
import { removeCookie } from '@helper/Cookie';
// import { notification } from 'antd';

// const openNotificationWithIcon = (type) => {
//   notification[type]({
//     message: 'Anda harus login terlebih dahulu',
//   });
// };

const redirectForbidden = () => {
  // openNotificationWithIcon('error');
  removeCookie(CONSTANT.TOKEN_NAME);
  logout({
    onLogoutSuccess: () => {},
  });
  Router.push('/');
};

export const newAuth = async (token_FIM) => {
  if (!token_FIM) {
    redirectForbidden();
    return {};
  }

  try {
    const response = await fetch({
      url: '/auth/checksession',
      method: 'post',
      data: {
        token: token_FIM,
      },
    });

    const status = response.data.status || false;

    if (!status) {
      redirectForbidden();
    }

    const data = response.data.data || {};

    return {
      token_FIM,
      step: data.step,
    };
  } catch (error) {
    // console.log('error: ', error);
    redirectForbidden();
    return {};
  }
};
