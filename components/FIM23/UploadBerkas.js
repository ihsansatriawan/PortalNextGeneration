import React, { useState, useEffect, useRef } from 'react';
import { string, bool } from 'prop-types';
import {
  Card,
  Row,
  Col,
  Typography,
  Upload,
  Spin,
  Icon,
  notification,
  Button,
} from 'antd';
import { fetch } from '@helper/fetch';
import { useIdentity } from '@context/profileContext';

const { Title, Text } = Typography;
import {
  styCardWrapper,
  styFileUploader,
  styTextUploadWrapper,
  styBtnAddFieldBerkas,
  styIconFileWrapper,
  styButtonSave,
  stySubmitWrapperButton,
} from './style';

const beforeUpload = (file) => {
  const isJPGorPDF = file.type === 'image/jpeg' || 'application/pdf';
  if (!isJPGorPDF) {
    notification.error({
      message: 'Kamu hanya bisa upload file JPG atau PDF !',
    });
  }
  const isLt2M = file.size / 2048 / 2048 < 1;
  if (!isLt2M) {
    notification.error({ message: 'File harus lebih kecil dari 2MB!' });
  }
  return isJPGorPDF && isLt2M;
};

const UploadBerkas = (props) => {
  const { cookieLogin } = props;
  const isFirstInitialize = useRef(true);
  const isAfterAllCompleted = useRef(false);
  const { isInPreview } = props;
  const isDisabled = isInPreview;

  const { setStep, fetchDataFormCompleteness } = useIdentity();

  const [attachment, setAttachment] = useState({
    identityFileUrl: '',
    recommendationLetterUrl: '',
    commitmentLetterUrl: '',
  });

  const [loading, setLoading] = useState({
    identityFileUrl: true,
    recommendationLetterUrl: true,
    commitmentLetterUrl: true,
  });

  const fetchDocument = async () => {
    setLoading({
      identityFileUrl: true,
      recommendationLetterUrl: true,
      commitmentLetterUrl: true,
    });

    const response = await fetch({
      url: '/document',
      method: 'get',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
    });

    const { status, data } = response.data;

    if (!status) {
      notification.error({ message: response.data.message });
    } else {
      if (data) {
        setAttachment(data);
      }
    }

    setLoading({
      identityFileUrl: false,
      recommendationLetterUrl: false,
      commitmentLetterUrl: false,
    });
  };

  const saveDocument = async () => {
    const response = await fetch({
      url: '/document',
      method: 'post',
      headers: {
        Authorization: `Bearer ${cookieLogin}`,
      },
      data: attachment,
    });

    const { status } = response.data;

    if (!status) {
      notification.error({ message: response.data.message });
    }

    if (status) {
      if (
        attachment.identityFileUrl &&
        attachment.recommendationLetterUrl &&
        attachment.commitmentLetterUrl
      ) {
        if (isAfterAllCompleted.current) {
          setStep(5);
        }
        fetchDataFormCompleteness('refetch');
      }
    }
  };

  useEffect(() => {
    if (!isFirstInitialize.current) {
      saveDocument();
    }
  }, [attachment]);

  useEffect(() => {
    fetchDocument();
    isFirstInitialize.current = false;
  }, []);

  const handleChange = (file, type) => {
    const status = file.file.status;

    try {
      switch (status) {
        case 'uploading':
          setLoading((prevState) => ({
            ...prevState,
            [type]: true,
          }));
          break;
        case 'error':
          notification.error({ message: 'Gagal Upload Berkas' });
          setLoading((prevState) => ({
            ...prevState,
            [type]: false,
          }));
          break;
        case 'done': {
          // message.success("Sukses Upload");
          const { secure_url } = file.file.response;

          setAttachment((prevState) => ({
            ...prevState,
            [type]: secure_url,
          }));

          setLoading((prevState) => ({
            ...prevState,
            [type]: false,
          }));
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreview = (url, name) => {
    const lengthChar = url.length;
    const fileFormat = url.substr(lengthChar - 3);

    if (fileFormat === 'pdf') {
      return (
        <div css={styIconFileWrapper}>
          <Icon
            type='file-pdf'
            style={{ fontSize: 100, color: '#a68b77', marginTop: '20px' }}
            theme='filled'
          />
          <p>{name}</p>
        </div>
      );
    }

    return (
      <div css={styIconFileWrapper}>
        <img src={url} alt='file' style={{ width: '100%' }} />
        <p>{name}</p>
      </div>
    );
  };

  const _saveBerkas = () => {
    notification.success({ message: "Berkas berhasil disimpan" });
    setStep(5);
  };

  const renderUploadForm = (type, name) => {
    return (
      <Row>
        <Col span={24}>
          <Text strong>{name}</Text>
          <Upload
            disabled={isDisabled}
            name='avatar'
            listType='picture-card'
            css={styFileUploader}
            showUploadList={false}
            action='https://api.cloudinary.com/v1_1/fim-indonesia/image/upload'
            beforeUpload={beforeUpload}
            onChange={(file) => handleChange(file, type)}
            data={(file) => {
              return {
                upload_preset:
                  type === 'identityFileUrl' ? 'ID_card' : 'document',
                file,
                tags: 'browser_upload',
              };
            }}
          >
            {attachment[type] ? (
              renderPreview(attachment[type], name)
            ) : (
              <div css={styTextUploadWrapper}>
                {loading[type] ? (
                  <>
                    <Spin
                      indicator={
                        <Icon
                          type='loading'
                          style={{ fontSize: 40, color: '#a68b77' }}
                          spin
                        />
                      }
                    />
                    <div style={{ marginTop: '10px' }}>Uploading...</div>
                  </>
                ) : (
                  <>
                    <div css={styBtnAddFieldBerkas}>
                      <Icon type='plus' />
                    </div>
                    <div className='ant-upload-text'>
                      Upload {name} kamu di sini atau telusuri
                    </div>
                    <small>
                      File berupa JPG, JPEG2000, PNG, dan PDF. Max File 2 MB.
                    </small>
                  </>
                )}
              </div>
            )}
          </Upload>
        </Col>
      </Row>
    );
  };

  return (
    <Card css={styCardWrapper}>
      <Title level={3}>Upload Berkas</Title>
      <p>
        Siapkan <b>foto diri</b> kamu (berpakaian rapi),{' '}
        <b>surat komitmen, surat rekomendasi</b>, dan <b>KTP</b> untuk diupload
        di sini ya.
      </p>
      {renderUploadForm('identityFileUrl', 'Scan KTP')}
      {renderUploadForm('recommendationLetterUrl', 'Surat Rekomendasi')}
      {renderUploadForm('commitmentLetterUrl', 'Surat Komitmen')}
      {!isInPreview && (
        <div css={stySubmitWrapperButton}>
          <Button
            disabled={isDisabled}
            size='large'
            css={styButtonSave}
            type='primary'
            htmlType='submit'
            onClick={_saveBerkas}
          >
            <Icon type='save' theme='filled' /> Simpan Perubahan
          </Button>
        </div>
      )}
    </Card>
  );
};

UploadBerkas.propTypes = { cookieLogin: string, isInPreview: bool };

export default UploadBerkas;
