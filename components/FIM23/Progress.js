import React from 'react';
import { styProgressWrapper } from './style';
import { Progress } from 'antd';
import { useIdentity } from '@context/profileContext';

const Header = () => {
  const { formCompleteness } = useIdentity();

  return (
    <div css={styProgressWrapper}>
      <div className='progressBar'>
        <Progress
          width={61}
          strokeColor='#5BC668'
          strokeWidth={10}
          type='circle'
          percent={formCompleteness.progress}
        />
      </div>
      <div className='caption'>
        <div className='title'>Progress Kelengkapan Formulir</div>
        <p className='subTitle'>
          Yuk segera lengkapi formulir kamu mulai dari data diri, essay, rencana
          pengabdian, & upload berkas.
        </p>
      </div>
    </div>
  );
};

export default Header;
