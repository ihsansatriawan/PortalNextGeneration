import React from 'react';
import { Card } from 'antd';
import { useIdentity } from '@context/profileContext';

import {
  styCardWrapper,
  styPengumumanWrapper,
  styEmptyStateRender,
  styItemPengumuman,
} from './style';

import EmptyStateImg from '@components/assets/empty-state.svg';
import SubmitedImg from '@components/assets/submited.svg';

const Pengumuman = () => {
  const { formCompleteness } = useIdentity();

  const renderEmptyState = () => {
    return (
      <div css={styEmptyStateRender}>
        <EmptyStateImg />
        <p className='caption'>Belum ada pengumuman terbaru</p>
      </div>
    );
  };

  const renderBerhasilSubmit = () => {
    return (
      <div css={styItemPengumuman}>
        <div className='image-wrapper'>
          <SubmitedImg />
        </div>
        <div>
          <span className='titlePengumuman'>
            Mantap! Formulir Pendaftaran FIM 23 Kamu Telah Dikirim
          </span>
          <p>
            Formulir kamu akan ditampung dan diseleksi oleh tim Forum Indonesia
            Muda. Pengumuman selanjutnya akan dikabarkan melalui email dan
            website ini. Jadi, tetap pantau secara berkala ya!{' '}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card css={styCardWrapper} style={{ minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Pengumuman</h2>
      <div css={styPengumumanWrapper}>
        {!formCompleteness.submittedAt
          ? renderEmptyState()
          : renderBerhasilSubmit()}
      </div>
    </Card>
  );
};

export default Pengumuman;
