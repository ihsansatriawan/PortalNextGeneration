import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useIdentity } from '@context/profileContext';
import DataLolosWawancara from './DataLolosWawancara';

import {
  styCardWrapper,
  styPengumumanWrapper,
  styEmptyStateRender,
  styItemPengumuman,
} from './style';

import EmptyStateImg from '@components/assets/empty-state.svg';
import SubmitedImg from '@components/assets/submited.svg';
import LolosIcon from '@components/assets/lolos-icon.svg';
import TidakLolosIcon from '@components/assets/submited.svg';

const Pengumuman = () => {
  const { formCompleteness, dataUser } = useIdentity();
  const [isLoadingLolos, setIsLoadingLolos] = useState(true);
  const dataFiltered = DataLolosWawancara.filter((data) => {
    return data['email'] === dataUser.email;
  });

  const isLolosWawancara = dataFiltered.length === 1;

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingLolos(false);
    }, 1000);
  }, []);

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

  const renderLolosWawancara = () => {
    return (
      <div css={styItemPengumuman}>
        <div className='image-wrapper'>
          <LolosIcon />
        </div>
        <div>
          <span className='titlePengumuman'>
            Selamat! Kamu Lolos Tahap Selanjutnya
          </span>
          <p>
            Kesempatanmu bergabung menjadi peserta FIM 23 semakin dekat karena
            kamu lolos ke tahap selanjutnya yaitu interview. Persiapkan dirimu
            sebaik-baiknya yaa!
          </p>
        </div>
      </div>
    );
  };

  const renderGagalWawancara = () => {
    return (
      <div css={styItemPengumuman}>
        <div className='image-wrapper'>
          <TidakLolosIcon />
        </div>
        <div>
          <span className='titlePengumuman'>
            Mohon Maaf! Kamu Belum Lolos ke Tahap Selanjutnya
          </span>
          <p>
            Kesempatanmu bergabung menjadi peserta FIM 23 harus tertunda dulu
            kali ini, terima kasih sudah mau mencoba ya! Sampai jumpa di FIM
            24..
          </p>
        </div>
      </div>
    );
  };

  const renderWawancara = () => {
    if (isLolosWawancara) {
      return renderLolosWawancara();
    }

    return renderGagalWawancara();
  };

  return (
    <Card css={styCardWrapper} style={{ minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px' }}>Pengumuman</h2>
      <div css={styPengumumanWrapper}>
        {!formCompleteness.submittedAt
          ? renderEmptyState()
          : renderBerhasilSubmit()}

        {formCompleteness.submittedAt && !isLoadingLolos && renderWawancara()}
      </div>
    </Card>
  );
};

export default Pengumuman;
