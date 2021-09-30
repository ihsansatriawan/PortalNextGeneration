import React, { useState } from 'react';
import LogoFim from '@components/Home/Slider/assets/logo-fim.svg';
import jwtDecode from 'jwt-decode';
import { string, bool } from 'prop-types';
import { useIdentity } from '@context/profileContext';
import Router from 'next/router';
import { message, Icon } from 'antd';
import { logout } from '@helper/googleSession';

import {
  styFormWrapper,
  stySidebarWrapper,
  styMainFormWrapper,
  styLogo,
  styMenuMobileLogic,
  styMenuDekstopLogic,
} from './style';

import Header from './Header';
import Progress from './Progress';
import StepMobile from './StepMobile';
import StepDesktop from './StepDesktop';
import DataDiri from './DataDiri';
import Essay from './Essay';
import UploadBerkas from './UploadBerkas';
import MenuFIM from './MenuFIM';
import MenuFIMDesktop from './MenuFIMDesktop';
import Pengumuman from './Pengumuman';

const stepList = [
  {
    id: 1,
    name: 'Data Diri',
    description: 'Lengkapi semua informasi data diri kamu.',
    type: 'isFirstStepCompleted',
  },
  {
    id: 2,
    name: 'Essay',
    description: 'Tulis pendapat kamu dari pertanyaan yang tersedia',
    type: 'isSecondStepCompleted',
  },
  {
    id: 3,
    name: 'Rencana Pengabdian',
    description: 'Buat rencana pengabdian kamu pasca FIM 23',
    type: 'isThirdStepCompleted',
  },
  {
    id: 4,
    name: 'Upload Berkas',
    description: 'Upload foto, surat komitmen, surat rekomendasi, & KTP',
    type: 'isFourthStepCompleted',
  },
  {
    id: 5,
    name: 'Final Preview',
    description: 'Final Preview',
    type: 'submittedAt',
  },
];

const ContinerFIM23 = (props) => {
  const { step } = useIdentity();
  const { cookieLogin, pengumuman } = props;
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  try {
    jwtDecode(cookieLogin);
  } catch (error) {
    console.log(error);
  }

  const renderStepForm = () => {
    switch (step) {
      case 1:
        return <DataDiri {...props} />;

      case 2:
        return <Essay {...props} category='essay' />;

      case 3:
        return <Essay {...props} category='volunteering_plan' />;

      case 4:
        return <UploadBerkas {...props} />;
      case 5:
        return (
          <>
            <DataDiri {...props} isInPreview={true} />
            <Essay {...props} category='essay' isInPreview={true} />
            <Essay {...props} category='volunteering_plan' isInPreview={true} />
            <UploadBerkas {...props} />
          </>
        );
      default:
        break;
    }
  };

  const onLogout = () => {
    logout({
      onLogoutSuccess: () => {
        Router.push('/');
      },
    });

    message.success('Berhasil Logout');
    Router.push('/');
  };

  const onRedirectPengumuman = () => {
    Router.push('/pengumuman');
  };

  const onClose = () => {
    setShowMenuMobile(false);
  };

  let currentStep = step;

  if (pengumuman) {
    currentStep = 0;
  }

  return (
    <div css={styFormWrapper}>
      <div css={stySidebarWrapper}>
        <LogoFim style={{ zIndex: '1001' }} className={styLogo} />
        <div css={styMenuMobileLogic}>
          <Icon
            className='menuburger'
            type='menu'
            onClick={() => {
              setShowMenuMobile(true);
            }}
          />
        </div>

        {showMenuMobile && (
          <div css={styMenuMobileLogic}>
            <MenuFIM
              onLogout={onLogout}
              onRedirectPengumuman={onRedirectPengumuman}
              onClose={onClose}
            />
          </div>
        )}

        <StepDesktop liststep={stepList} step={currentStep} />

        <div css={styMenuDekstopLogic}>
          <MenuFIMDesktop
            onLogout={onLogout}
            onRedirectPengumuman={onRedirectPengumuman}
            onClose={onClose}
          />
        </div>
      </div>

      <div css={styMainFormWrapper}>
        <Header />
        {!pengumuman ? (
          <>
            <Progress />
            <StepMobile liststep={stepList} step={step} />

            {renderStepForm()}
          </>
        ) : (
          <Pengumuman />
        )}
      </div>
    </div>
  );
};

ContinerFIM23.propTypes = {
  cookieLogin: string,
  pengumuman: bool,
};

export default ContinerFIM23;
