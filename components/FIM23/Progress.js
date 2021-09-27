import React, { useState } from 'react';
import {
  styProgressWrapper,
  styButtonSubmitAll,
  styMeterWrapper,
} from './style';
import { Progress, Modal } from 'antd';
import { useIdentity } from '@context/profileContext';

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
        title='Basic Modal'
        visible={openModal}
        onOk={onConfirmOK}
        onCancel={onCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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

      <div className={styButtonSubmitAll} onClick={onSubmitAll}>
        Submit Form Sekarang
      </div>

      <ModalConfirm />
    </div>
  );
};

export default Header;
