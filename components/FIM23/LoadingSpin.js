import React from 'react';
import { Spin } from 'antd';

import { stySpinWrapper } from './style';

const LoadingSpin = () => {
  return (
    <div css={stySpinWrapper}>
      <Spin size='large' className='spin-gif' />
    </div>
  );
};

export default LoadingSpin;
