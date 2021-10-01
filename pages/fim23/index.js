import React from 'react';
import Slider from '@components/Home/Slider';
import DownloadDoc from '@components/Home/DownloadDoc';
import FAQ from '@components/Home/FAQ';
import Step from '@components/Home/Step';

import { homePageWrapper } from './index-style.js';

const homePage = (props) => {
  return (
    <div css={homePageWrapper}>
      <Slider {...props} />
      <Step />
      <DownloadDoc />
      <FAQ />
    </div>
  );
};

export default homePage;
