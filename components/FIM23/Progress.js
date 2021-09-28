import React, { useState } from 'react';
import Sending from '@components/assets/sending.svg';
import Finish from '@components/assets/finish.svg';

import {
  styProgressWrapper,
  styButtonSubmitAll,
  styMeterWrapper,
  styModalWrapper,
  styButtonWrapper,
  styModalSend,
} from './style';
import { Progress, Modal, Typography, Button } from 'antd';
import { useIdentity } from '@context/profileContext';
import Router from 'next/router';

const { Title } = Typography;

const Header = () => {
  const { formCompleteness, onHandleAllSubmit, submitAllState } = useIdentity();
  const [openModal, setOpenModal] = useState(false);

  const onSubmitAll = () => {
    setOpenModal(true);
  };

  const onConfirmOK = () => {
    onHandleAllSubmit();
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onCheckPengumuman = () => {
    Router.push('/pengumuman');
  };

  const renderModalContent = () => {
    if (submitAllState.loading) {
      return (
        <div css={styModalSend}>
          <div className='img'>
            <Sending />
          </div>
          <span>Sedang Mengirim...</span>
        </div>
      );
    }

    if (!submitAllState.loading && submitAllState.status) {
      return (
        <div css={styModalWrapper}>
          <div style={{ marginBottom: '20px' }}>
            <Finish />
          </div>
          <Title level={4}>
            Mantap! Formulir Pendaftaran Kamu Sudah Terkirim
          </Title>
          <p>
            Pengumuman selanjutnya akan dikabarkan melalui email dan website
            ini. Kamu bisa mengeceknya di halaman pengumuman.
          </p>
          <div css={styButtonWrapper}>
            <Button className='batal' size='large' onClick={onCancel}>
              Kembali ke Form
            </Button>
            <Button className='submit' size='large' onClick={onCheckPengumuman}>
              Cek Pengumuman
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div css={styModalWrapper}>
        <Title level={4}>
          Yakin Mau Submit Formulir Pendaftaran FIM 23 Sekarang?
        </Title>
        <p>
          Pastikan semua data yang kamu masukkan benar ya. Setelah submit form,
          kamu tidak dapat mengubah atau mengedit data lagi.{' '}
        </p>
        <div css={styButtonWrapper}>
          <Button className='batal' size='large' onClick={onCancel}>
            Batal
          </Button>
          <Button className='submit' size='large' onClick={onConfirmOK}>
            Submit Sekarang
          </Button>
        </div>
      </div>
    );
  };

  const ModalConfirm = () => {
    return (
      <Modal
        closable={false}
        visible={openModal}
        onOk={onConfirmOK}
        onCancel={onCancel}
        footer={null}
        width='max-content'
      >
        {renderModalContent()}
      </Modal>
    );
  };

  return (
    <div css={styProgressWrapper}>
      <div css={styMeterWrapper}>
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
          <div className='title'>
            {formCompleteness.progress === 100
              ? 'Wohooo... Formulir Kamu Sudah Lengkap!'
              : 'Progress Kelengkapan Formulir'}
          </div>
          <p className='subTitle'>
            {formCompleteness.progress === 100
              ? 'Kamu bisa cek Final Preview dulu. Kalau semua sudah oke, kamu bisa submit formulir kamu sekarang.'
              : 'Yuk segera lengkapi formulir kamu mulai dari data diri, essay, rencana pengabdian, & upload berkas.'}
          </p>
        </div>
      </div>

      {formCompleteness.progress === 100 && (
        <div css={styButtonSubmitAll} onClick={onSubmitAll}>
          Submit Form Sekarang
        </div>
      )}

      <ModalConfirm />
    </div>
  );
};

export default Header;
