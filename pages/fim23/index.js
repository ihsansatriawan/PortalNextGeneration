import React from 'react';
import Slider from '@components/Home/Slider';
import DownloadDoc from '@components/Home/DownloadDoc';

import { homePageWrapper } from './index-style.js';

const homePage = (props) => {
  return (
    <div css={homePageWrapper}>
      <Slider {...props} />
      <DownloadDoc />
    </div>
  );
};

export default homePage;
