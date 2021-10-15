import React from 'react';
import { object, bool } from 'prop-types';
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
import LoadingSpin from '@components/FIM23/LoadingSpin.js';

import {
  styDataDiriWrapper,
  styPrimaryIdentity,
  styPhotoProfileWrapper,
  styBasicInfo,
  styInfo,
} from './style';

const DataDiri = (props) => {
  const { isLoading } = props;
  const { Identity } = props.dataParticipant;

  if (!Identity || isLoading) {
    return <LoadingSpin />;
  }

  const {
    photoUrl,
    address,
    fullName,
    bornPlace,
    bornDate,
    gender,
    cityAddress,
    provinceAddress,
  } = Identity;

  console.log(Identity);
  console.log('Identity');

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
              <img src={photoUrl} alt='profile-picture' />
            </div>
            <div css={styBasicInfo}>
              <Row style={{ marginBottom: '20px' }}>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Nama</label>
                    <span>{fullName}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Tempat Lahir</label>
                    <span>{bornPlace}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Tanggal Lahir</label>
                    <span>{`${new Date(bornDate).getDate()}-${new Date(
                      bornDate
                    ).getMonth()}-${new Date(bornDate).getFullYear()}`}</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: '20px' }}>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Jenis Kelamin</label>
                    <span>{gender}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Kota</label>
                    <span>{cityAddress}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div css={styInfo}>
                    <label>Provinsi</label>
                    <span>{provinceAddress}</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: '20px' }}>
                <Col span={24}>
                  <div css={styInfo}>
                    <label>Alamat Lengkap</label>
                    <span>{address}</span>
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

DataDiri.propTypes = {
  dataParticipant: object,
  isLoading: bool,
};

export default DataDiri;
