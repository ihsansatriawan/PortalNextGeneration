import React, { useState } from 'react';
import {
  Modal,
  Radio,
  Row,
  Col,
  Form,
  Input,
  Button,
  notification,
  Upload,
  message,
  Icon,
} from 'antd';
import { fetch } from '@helper/fetch';

import { bool, func, string } from 'prop-types';

import { styButtonWrapper } from './style';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const { TextArea } = Input;

const ModalConfirmation = ({
  openModal,
  onCancel,
  onComplete,
  cookieLogin,
}) => {
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [alasan, setAlasan] = useState('');
  const [loadingSave, setIsLoadingSave] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [attachment, setAttachment] = useState();
  const [fileName, setFileName] = useState(null);

  const onChangeKonfirmasi = (e) => {
    const kehadiranValue = e.target.value;
    setKonfirmasi(kehadiranValue);
  };

  const onSaveKonfirmasi = async () => {
    setIsLoadingSave(true);

    try {
      const response = await fetch({
        url: '/attendance',
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: {
          batch: '23',
          isAttend: konfirmasi,
          reason: alasan,
          reasonUrl: attachment,
        },
      });

      const status = response.data.status || false;
      if (status) {
        notification.success({ message: response.data.message });
        onComplete();
        onCancel();
        setIsLoadingSave(false);
      }
    } catch (err) {
      console.log(err);
      console.log('err');
      setIsLoadingSave(false);
    }
  };

  const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG / PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Image must smaller than 1MB!');
    }
    return isJPG && isLt2M;
  };

  const handleChangeFile = (file) => {
    const status = file.file.status;

    try {
      switch (status) {
        case 'uploading':
          setLoadingUpload(true);
          break;
        case 'error':
          notification.error({ message: 'Gagal Upload Berkas' });
          setLoadingUpload(false);
          break;
        case 'done': {
          // message.success("Sukses Upload");

          const { secure_url, original_filename } = file.file.response;
          setAttachment(secure_url);
          setFileName(original_filename);
          setLoadingUpload(false);
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const renderUpload = () => {
    return (
      <Upload
        className='avatar-uploader'
        showUploadList={false}
        action='https://api.cloudinary.com/v1_1/fim-indonesia/image/upload'
        beforeUpload={beforeUpload}
        onChange={handleChangeFile}
        data={(file) => {
          return {
            upload_preset: 'document',
            file,
            tags: 'browser_upload',
          };
        }}
      >
        <div style={{ marginRight: '20px' }}>
          upload bukti pendukung (jika ada)
        </div>
        <Button
          loading={loadingUpload}
          style={{ maxWidth: '400px', overflow: 'hidden' }}
        >
          <Icon type='upload' /> {attachment ? fileName : 'Cari Dokumen'}
        </Button>
      </Upload>
    );
  };

  return (
    <Modal
      closable={true}
      visible={openModal}
      onCancel={onCancel}
      footer={null}
      style={{ width: '400px', textAlign: 'left' }}
    >
      <div>
        <h1>Konfirmasi Kehadiran</h1>
        <p>
          FIM 23 akan dilaksanakan pada tanggal 9-12 Desember 2021 (online) yang
          akan dimulai pada pukul 07.00 hingga 16.00 WIB setiap harinya. Dengan
          informasi tersebut, mohon konfirmasikan kehadiran kamu pada form di
          bawah ini ya.
        </p>

        <Radio.Group onChange={onChangeKonfirmasi} value={konfirmasi}>
          <Radio style={radioStyle} value={true}>
            Saya Bisa Hadir
          </Radio>
          <Radio style={radioStyle} value={false}>
            Saya Tidak Bisa Hadir
          </Radio>
        </Radio.Group>

        {konfirmasi === false ? (
          <>
            <Row style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Form.Item label='Alasan tidak bisa hadir'>
                  <TextArea
                    onChange={(e) => setAlasan(e.target.value)}
                    placeholder='tuliskan alasan kamu apabila tidak bisa hadir '
                    value={alasan}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }}>{renderUpload()}</Row>
          </>
        ) : (
          ''
        )}

        <div css={styButtonWrapper}>
          <Button className='batal' size='large' onClick={onCancel}>
            Kembali
          </Button>
          <Button
            className='submit'
            size='large'
            loading={loadingSave}
            disabled={loadingUpload}
            onClick={onSaveKonfirmasi}
          >
            Kirim Konfirmasi Kehadiran
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ModalConfirmation.propTypes = {
  openModal: bool,
  onCancel: func,
  onComplete: func,
  cookieLogin: string,
};

export default ModalConfirmation;
