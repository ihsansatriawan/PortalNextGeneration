import React from 'react';
import LogoFim from '@components/Home/Slider/assets/logo-fim.svg';
import Router from 'next/router';

import StepDesktop from '@components/FIM23/StepDesktop';
import MenuFIMDesktop from '@components/FIM23/MenuFIMDesktop';
import Header from '@components/FIM23/Header';

import People from '@components/assets/icon/daftar-capes.svg';
import Checklist from '@components/assets/icon/sudah-dinilai.svg';
import ArchivePeople from '@components/assets/icon/capes-diarsipkan.svg';

import {
  styFormWrapper,
  stySidebarWrapper,
  styMainFormWrapper,
  styLogo,
  styMenuDekstopLogic,
} from '@components/FIM23/style';

const ContainerRecruiter = (props) => {
  //   const { cookieLogin, pengumuman } = props;

  const stepList = [
    {
      id: 1,
      name: 'Daftar Capes',
      description: 'Semua capes yang sudah mendaftar ada di sini',
      type: 'isFirstStepCompleted',
      icon: <People />,
      count: 1,
    },
    {
      id: 2,
      name: 'Sudah Dinilai',
      description: 'Di sini isinya capes yang sudah dinilai oleh recruiter',
      type: 'isSecondStepCompleted',
      icon: <Checklist />,
      count: 1,
    },
    {
      id: 3,
      name: 'Capes Diarsipkan',
      description: 'Cek keseluruhan data formulir kamu sebelum dikirim ya!',
      type: 'isSecondStepCompleted',
      icon: <ArchivePeople />,
      count: 1,
    },
  ];

  return (
    <div css={styFormWrapper}>
      <div css={stySidebarWrapper}>
        <LogoFim
          style={{ zIndex: '2' }}
          onClick={() => Router.push('/')}
          className={styLogo}
        />

        <StepDesktop liststep={stepList} step={1} />

        <div css={styMenuDekstopLogic}>
          <MenuFIMDesktop />
        </div>
      </div>

      <div css={styMainFormWrapper}>
        <Header />
      </div>
    </div>
  );
};

export default ContainerRecruiter;
