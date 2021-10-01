import React from 'react';
import { Icon } from 'antd';
import { styWrapper, styDownloadWrapper, styButton } from './style';

const DownloadDoc = () => {
  return (
    <div css={styWrapper}>
      <h2>Download Template Dokumen</h2>
      <div css={styDownloadWrapper}>
        <a
          href='https://res.cloudinary.com/fim-indonesia/raw/upload/v1633100744/Template__Surat_Rekomendasi_FIM_23.docx'
          target='_blank'
          rel='noreferrer'
        >
          <div css={styButton}>
            <Icon type='file-text' />
            <span>Template Surat Rekomendasi</span>
          </div>
        </a>
        <a
          href='https://res.cloudinary.com/fim-indonesia/raw/upload/v1633100743/Template__Pernyataan_Komitmen_FIM_23.docx'
          target='_blank'
          rel='noreferrer'
        >
          <div css={styButton}>
            <Icon type='file-protect' />
            <span>Template Surat Komitmen</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DownloadDoc;
