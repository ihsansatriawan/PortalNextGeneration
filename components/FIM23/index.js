import React from 'react';
import LogoFim from '@components/Home/Slider/assets/logo-fim.svg';
import jwtDecode from 'jwt-decode';
import { string } from 'prop-types';
import { useIdentity } from '@context/profileContext';

import {
  styFormWrapper,
  stySidebarWrapper,
  styMainFormWrapper,
  styLogo,
} from './style';

import Header from './Header';
import Progress from './Progress';
import StepMobile from './StepMobile';
import StepDesktop from './StepDesktop';
import DataDiri from './DataDiri';
import Essay from './Essay';
import UploadBerkas from './UploadBerkas';

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
  const { step, setStep } = useIdentity();
  const { cookieLogin } = props;
  let decode = {};

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

  return (
    <div css={styFormWrapper}>
      <div css={stySidebarWrapper}>
        <LogoFim className={styLogo} />
        <StepDesktop liststep={stepList} step={step} />
      </div>

      <div css={styMainFormWrapper}>
        <Header />
        <Progress />
        <StepMobile liststep={stepList} step={step} />

        {renderStepForm()}
      </div>
    </div>
  );
};

ContinerFIM23.propTypes = {
  cookieLogin: string,
};

export default ContinerFIM23;
