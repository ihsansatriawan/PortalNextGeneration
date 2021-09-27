import React from 'react';
import {
  Card,
  Row,
  Form,
  Col,
  Upload,
  Input,
  Radio,
  message,
  Icon,
} from 'antd';
import { styCardWrapper } from '../style';
import { object, func, bool } from 'prop-types';
import LoadingSpin from '../LoadingSpin';

const beforeUploadCertificate = (file) => {
  const isJPGorPDF = file.type === 'image/jpeg' || 'application/pdf';
  if (!isJPGorPDF) {
    message.error('Kamu hanya bisa upload file JPG atau PDF !');
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('File harus lebih kecil dari 1MB!');
  }
  return isJPGorPDF && isLt2M;
};

const Profesi = (props) => {
  const { getFieldDecorator } = props.form;
  const { listCertificate, setListCertificate, isLoading } = props;

  const handlePreviewOnPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = file.url;
    }
    setListCertificate((prevState) => ({
      ...prevState,
      previewImage: file.url || file.preview,
      previewVisible: true,
    }));
  };

  const handleChangeCertificate = (file) => {
    const { fileList } = file;

    setListCertificate((prevState) => {
      return {
        ...prevState,
        fileList: fileList.map((value) => {
          let success = {};

          if (value.response) {
            success = {
              url: value.response.secure_url,
            };
          }

          return {
            ...value,
            uid: value.uid,
            name: value.name,
            status: value.status,
            ...success,
          };
        }),
      };
    });
  };

  const uploadButton = (
    <div>
      <Icon type='plus' />
      <div className='ant-upload-text'>Tambah Sertifikat</div>
    </div>
  );

  return (
    <Card css={styCardWrapper}>
      {isLoading && <LoadingSpin />}
      <Row>
        <Col span={24}>
          <Form.Item label='Institusi'>
            {getFieldDecorator('institution', {
              rules: [
                {
                  required: true,
                  message: 'Tolong isi Institusi asal kamu!',
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Profesi/Jabatan'>
            {getFieldDecorator('occupation', {
              rules: [
                {
                  required: true,
                  message:
                    'Tolong isi Profesi jabatan/aktivitas kamu saat ini ',
                },
              ],
            })(<Input placeholder='Isi Profesi / Jabatan' />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Apakah memiliki keahlian video editing ?'>
            {getFieldDecorator('isAbleVideoEditing', {
              rules: [{ required: true, message: 'Pilihan wajib diisi' }],
            })(
              <Radio.Group
                defaultValue='a'
                buttonStyle='solid'
                size='large'
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Radio.Button
                  value={true}
                  style={{ width: '48%', textAlign: 'center' }}
                >
                  Ya
                </Radio.Button>
                <Radio.Button
                  value={false}
                  style={{ width: '48%', textAlign: 'center' }}
                >
                  Tidak
                </Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label='Portfolio Video Editing'>
            {getFieldDecorator('videoEditingPortofolioUrl', {
              rules: [
                {
                  required: false,
                  message: null,
                },
              ],
            })(
              <Input placeholder='tambahkan link portfolio video editing (jika ada)' />
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label strong style={{ marginBottom: '10px' }}>
            Sertifikasi Keahlian
          </label>
          <Upload
            action='https://api.cloudinary.com/v1_1/fim-indonesia/image/upload'
            listType='picture-card'
            beforeUpload={beforeUploadCertificate}
            fileList={listCertificate.fileList}
            onPreview={handlePreviewOnPreview}
            onChange={handleChangeCertificate}
            accept='image/jpeg,application/pdf'
            style={{ marginTop: '10px' }}
            data={(file) => {
              return {
                upload_preset: 'profile_photo',
                file,
                tags: 'browser_upload',
              };
            }}
          >
            {listCertificate.fileList.length >= 3 ? null : uploadButton}
          </Upload>
        </Col>
      </Row>
    </Card>
  );
};

Profesi.propTypes = {
  form: object.isRequired,
  listCertificate: object,
  setListCertificate: func,
  isLoading: bool,
};

export default Profesi;
