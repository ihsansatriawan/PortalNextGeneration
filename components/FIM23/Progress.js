import React, { useState, useEffect } from 'react';
import { bool } from 'prop-types';
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
import ClosedImage from '@components/assets/closed-icon.svg';

const { Title } = Typography;

const Header = ({ lastElement }) => {
  const { formCompleteness, onHandleAllSubmit, submitAllState } = useIdentity();
  const [openModal, setOpenModal] = useState(false);
  const [isModalClosedOpen, setIsModalClosedOpen] = useState(false);
  const currentTime = Math.round(new Date().getTime() / 1000);
  const isRegistrationClosed = currentTime > 1634921999; //Friday, October 22, 2021 11:59:59 PM GMT+07:00

  useEffect(() => {
    if (isRegistrationClosed) {
      setIsModalClosedOpen(true);
    }
  }, []);

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

  const ModalClosed = () => {
    return (
      <Modal
        closable={true}
        visible={isModalClosedOpen}
        onOk={() => setIsModalClosedOpen(false)}
        onCancel={() => setIsModalClosedOpen(false)}
        footer={null}
        style={{ width: '400px', textAlign: 'center' }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              background: '#FAF3EE',
              padding: '20px',
            }}
          >
            <ClosedImage />
          </div>
          <h1>Oops.. Pendaftaran Sudah Ditutup!</h1>
          <p>
            Hai, Kamu. Sayang sekali pendaftarannya sudah ditutup. Data kamu
            akan kami simpan biar kamu bisa daftar lagi tahun depan. Semangat
            ya!
          </p>
          <Button
            style={{
              width: '100%',
              background: '#FF8229',
              color: 'white',
              fontWeight: '700',
              padding: '10px',
              height: 'max-content',
              marginTop: '20px',
            }}
            onClick={() => setIsModalClosedOpen(false)}
          >
            Ok, Mengerti
          </Button>
        </div>
      </Modal>
    );
  };

  const isButtonShow =
    formCompleteness.progress === 100 && !formCompleteness.submittedAt;

  return (
    <div css={styProgressWrapper}>
      {isRegistrationClosed ? (
        <div css={styMeterWrapper}>
          <div className='progressBar'>
            {isRegistrationClosed ? (
              <div>
                <ClosedImage />
              </div>
            ) : (
              <Progress
                width={61}
                strokeColor='#5BC668'
                strokeWidth={10}
                type='circle'
                percent={formCompleteness.progress}
              />
            )}
          </div>
          <div className='caption'>
            <div className='title'>Oops.. Pendaftaran Sudah Ditutup!</div>
            <p className='subTitle'>
              Hai, Kamu. Sayang sekali pendaftarannya sudah ditutup. Data kamu
              akan kami simpan biar kamu bisa daftar lagi tahun depan. Semangat
              ya!
            </p>
          </div>
        </div>
      ) : (
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
      )}

      {isButtonShow && !isRegistrationClosed && (
        <div css={styButtonSubmitAll} onClick={onSubmitAll}>
          Submit Form Sekarang
        </div>
      )}

      <ModalConfirm />
      {lastElement && <ModalClosed />}
    </div>
  );
};

Header.propTypes = {
  lastElement: bool,
};

export default Header;
