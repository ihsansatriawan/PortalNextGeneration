import React from 'react';
import { Card } from 'antd';
import {
  styCardWrapper,
  styPengumumanWrapper,
  styEmptyStateRender,
} from './style';

import EmptyStateImg from '@components/assets/empty-state.svg';

const Pengumuman = () => {
  const renderEmptyState = () => {
    return (
      <div css={styEmptyStateRender}>
        <EmptyStateImg />
        <p className='caption'>Belum ada pengumuman terbaru</p>
      </div>
    );
  };

  return (
    <Card css={styCardWrapper}>
      <h2>Pengumuman</h2>
      <div css={styPengumumanWrapper}>{renderEmptyState()}</div>
    </Card>
  );
};

export default Pengumuman;
