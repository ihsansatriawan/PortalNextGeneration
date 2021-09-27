import React from 'react';
import LogoFim from '@components/Home/Slider/assets/logo-fim.svg';

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

const step = [
  {
    id: 1,
    name: 'Data Diri',
    description: 'Lengkapi semua informasi data diri kamu.',
  },
  {
    id: 2,
    name: 'Essay',
    description: 'Tulis pendapat kamu dari pertanyaan yang tersedia',
  },
  {
    id: 3,
    name: 'Rencana Pengabdian',
    description: 'Buat rencana pengabdian kamu pasca FIM 23',
  },
  {
    id: 4,
    name: 'Upload Berkas',
    description: 'Upload foto, surat komitmen, surat rekomendasi, & KTP',
  },
  {
    id: 5,
    name: 'Final Preview',
    description: 'Final Preview',
  },
];

const ContinerFIM23 = (props) => {
  return (
    <div css={styFormWrapper}>
      <div css={stySidebarWrapper}>
        <LogoFim className={styLogo} />
        <StepDesktop liststep={step} />
      </div>

      <div css={styMainFormWrapper}>
        <Header />
        <Progress />
        <StepMobile liststep={step} />
        {/* <DataDiri {...props} /> */}
        {/* <Essay {...props} step='volunteering_plan' /> */}
        <UploadBerkas {...props} />
      </div>
    </div>
  );
};

export default ContinerFIM23;
