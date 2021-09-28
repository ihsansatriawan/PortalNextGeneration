import React, { useState } from 'react';
import {
  styProgressWrapper,
  styButtonSubmitAll,
  styMeterWrapper,
  styModalWrapper,
  styButtonWrapper,
} from './style';
import { Progress, Modal, Typography, Button } from 'antd';
import { useIdentity } from '@context/profileContext';
const { Title } = Typography;

const Header = () => {
  const { formCompleteness, submitAllOk } = useIdentity();
  const [openModal, setOpenModal] = useState(false);

  const onSubmitAll = () => {
    setOpenModal(true);
  };

  const onConfirmOK = () => {
    submitAllOk();
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const ModalConfirm = () => {
    return (
      <Modal
        visible={openModal}
        onOk={onConfirmOK}
        onCancel={onCancel}
        footer={null}
      >
        <div css={styModalWrapper}>
          <Title level={4}>
            Yakin Mau Submit Formulir Pendaftaran FIM 23 Sekarang?
          </Title>
          <p>
            Pastikan semua data yang kamu masukkan benar ya. Setelah submit
            form, kamu tidak dapat mengubah atau mengedit data lagi.{' '}
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
          <div className='title'>Progress Kelengkapan Formulir</div>
          <p className='subTitle'>
            Yuk segera lengkapi formulir kamu mulai dari data diri, essay,
            rencana pengabdian, & upload berkas.
          </p>
        </div>
      </div>

      <div css={styButtonSubmitAll} onClick={onSubmitAll}>
        Submit Form Sekarang
      </div>

      <ModalConfirm />
    </div>
  );
};

export default Header;
