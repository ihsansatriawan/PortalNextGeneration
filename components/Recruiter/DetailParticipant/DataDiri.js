import React from 'react';
import {
  Typography,
  Card,
  Row,
  Form,
  Col,
  Upload,
  message,
  Button,
  Icon,
  Input,
  DatePicker,
  Radio,
  Select,
} from 'antd';

import {
  styDataDiriWrapper,
  styPrimaryIdentity,
  styPhotoProfileWrapper,
  styBasicInfo,
  styInfo,
} from './style';

const DataDiri = () => {
  return (
    <div css={styDataDiriWrapper}>
      <Row>
        <Col span={24}>
          <h4>DATA DIRI</h4>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div css={styPrimaryIdentity}>
            <div css={styPhotoProfileWrapper}>
              <img
                src='https://res.cloudinary.com/fim-indonesia/image/upload/v1633960621/profile_photo/Screen_Shot_2021-10-11_at_20.53.33_lusex1.png'
                alt='profile-picture'
              />
            </div>
            <div css={styBasicInfo}>
              <Row>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Nama</label>
                    <span>Bagus Dwi Utama</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Tempat Lahir</label>
                    <span>Purbalingga</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Tanggal Lahir</label>
                    <span>Purbalingga</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Jenis Kelamin</label>
                    <span>Laki-laki</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Kota</label>
                    <span>Purbalingga</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Profinsi</label>
                    <span>Purbalingga</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div css={styInfo}>
                    <label>Alamat Lengkap</label>
                    <span>
                      Karangaren No. 16 RT 01 / RW 01, Kecamatan Kutasari,
                      Kabupaten Purbalingga 53361
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DataDiri;
