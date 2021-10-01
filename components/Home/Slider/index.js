import React from 'react';
import LoginComponent from '@components/Login';

import {
  stySliderWrapper,
  styPrimaryHomeHeader,
  styLogoWrapper,
  styImageWrapper,
} from './style';
import PrimaryPicture from './assets/primary-picture.svg';
import LogoFim from './assets/logo-fim.svg';

const Slider = (props) => {
  const { cookieLogin } = props;

  let showButton = false;

  const currentTime = Math.round(new Date().getTime() / 1000);

  if (currentTime > 1635526800) {
    // 30 Oktober
    showButton = true;
  }

  return (
    <div css={stySliderWrapper}>
      <div css={styImageWrapper}>
        <div css={styLogoWrapper}>
          <LogoFim />
        </div>
        <PrimaryPicture className='primary-illustration' />
      </div>
      <div css={styPrimaryHomeHeader}>
        <h1>
          Selamat Datang,
          <br /> Pemuda Pemudi Indonesia
        </h1>
        <h3>
          Pendaftaran FIM 23 telah dibuka. Yuk masuk atau daftar akun kamu di
          sini.
        </h3>

        <LoginComponent cookieLogin={cookieLogin} />
      </div>
    </div>
  );
};

export default Slider;
