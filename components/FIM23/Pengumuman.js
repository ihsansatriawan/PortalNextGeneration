import React, { useState, useEffect } from 'react';
import { Card, Button, notification, Icon } from 'antd';
import { useIdentity } from '@context/profileContext';
import DataLolosWawancara from './DataLolosWawancara';
import DataLolosFim from './DataLolosFim';

import { string } from 'prop-types';

import { fetch } from '@helper/fetch';

import {
  styCardWrapper,
  styPengumumanWrapper,
  styEmptyStateRender,
  styItemPengumuman,
  styButtonWrapper,
} from './style';

import EmptyStateImg from '@components/assets/empty-state.svg';
import SubmitedImg from '@components/assets/submited.svg';
import LolosIcon from '@components/assets/lolos-icon.svg';
import TidakLolosIcon from '@components/assets/submited.svg';

import ModalConfirmation from './ModalConfirmation';

const Pengumuman = (props) => {
  const { cookieLogin } = props;

  const [openModal, setOpenModal] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [dataAttendence, setDataAttendence] = useState({
    batch: '23',
    isAttend: null,
    reason: null,
    reasonUrl: null,
  });

  const { formCompleteness, dataUser } = useIdentity();
  const [isLoadingLolos, setIsLoadingLolos] = useState(true);
  const dataFiltered = DataLolosWawancara.filter((data) => {
    return data['email'] === dataUser.email;
  });

  const dataLolosFim = DataLolosFim.filter((data) => {
    return data['email'] === dataUser.email;
  });

  const isLolosWawancara = dataFiltered.length === 1;
  const isLolosFim = dataLolosFim.length === 1;

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingLolos(false);
    }, 1000);
  }, []);

  const onFetchAttendence = async () => {
    setLoadingFetch(true);
    try {
      const response = await fetch({
        url: `/attendance`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.status || false;

      if (!status) {
        notification.error({ message: response.message });
      } else {
        const responseData = response.data || [];
        setDataAttendence(responseData.data);
      }

      setLoadingFetch(false);
    } catch (error) {
      console.error(error);
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    onFetchAttendence();
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
            Mohon Maaf, Kamu Belum Lolos ke Tahap Selanjutnya
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

  const onDownloadDocument = () => {
    window.open(dataAttendence.reasonUrl, '_blank', 'noopener noreferer');
  };

  const renderLolosFim = () => {
    const isThereIsValue = dataAttendence.isAttend !== null;
    const isAttend = dataAttendence.isAttend === true;
    const fileUrl = dataAttendence.reasonUrl;

    let wording = '';

    if (isAttend) {
      wording = '✅ Konfirmasi Siap Hadir';
    } else {
      wording = `❌ Tidak Dapat Hadir (${dataAttendence.reason})`;
    }

    return (
      <div
        css={styItemPengumuman}
        style={{ background: '#FAF3EE', padding: '20px' }}
      >
        <div className='image-wrapper'>
          <LolosIcon />
        </div>
        <div>
          <span className='titlePengumuman'>
            Selamat
            {`, ${dataUser.Identity ? dataUser.Identity.firstName : ''}`}! Kamu
            Lolos FIM 23
          </span>
          <p>
            Cie, selamat ya! Kamu lolos seluruh tahapan rekrutment Pelatihan FIM
            23. Setelah ini, segera konfirmasi kehadiran pelatihan FIM 23 yang
            akan dilaksanakan pada <b>9-12 Desember 2021.</b>
            <div css={styButtonWrapper} style={{ marginTop: '20px' }}>
              <Button
                className='submit'
                size='large'
                loading={loadingFetch}
                onClick={() => setOpenModal(true)}
                disabled={isThereIsValue}
              >
                {!isThereIsValue ? 'Kirim Konfirmasi Kehadiran' : wording}
              </Button>
              {fileUrl ? (
                <Button onClick={onDownloadDocument}>
                  <Icon type='download' /> Dokumen Pendukung
                </Button>
              ) : (
                ''
              )}
            </div>
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

        {formCompleteness.submittedAt && !isLoadingLolos && renderWawancara()}
        {formCompleteness.submittedAt &&
          !isLoadingLolos &&
          isLolosFim &&
          renderLolosFim()}
        {isLolosFim ? (
          <ModalConfirmation
            openModal={openModal}
            onCancel={() => setOpenModal(false)}
            onComplete={() => onFetchAttendence()}
            {...props}
          />
        ) : (
          ''
        )}
      </div>
    </Card>
  );
};

Pengumuman.propTypes = {
  cookieLogin: string,
};

export default Pengumuman;
