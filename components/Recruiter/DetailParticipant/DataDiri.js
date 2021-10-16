import React from 'react';
import { object, bool } from 'prop-types';
import { Row, Col, Icon } from 'antd';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';

import {
  styDataDiriWrapper,
  styPrimaryIdentity,
  styPhotoProfileWrapper,
  styBasicInfo,
  styInfo,
  stySocialMediaWrapper,
} from './style';

const DataDiri = (props) => {
  const { isLoading } = props;
  const {
    Identity,
    Skill,
    SocialMedia,
    AlumniReference,
    FimActivity,
    OrganizationExperiences,
  } = props.dataParticipant;

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
    bloodGroup,
    hobby,
    emergencyPhone,
    religion,
    phone,
    institution,
    occupation,
  } = Identity;

  const {
    firstCertificateUrl,
    isAbleVideoEditing,
    secondCertificateUrl,
    thirdCertificateUrl,
    videoEditingPortofolioUrl,
  } = Skill;

  const {
    facebookUrl,
    instagramUrl,
    otherSiteUrl,
    reason,
    twitterUrl,
    websiteUrl,
  } = SocialMedia;

  const {
    acquaintedSince,
    batch,
    fullName: fulnameReference,
    phoneNumber,
    relationship,
  } = AlumniReference;

  const { duration, eventScale, responsibility, result, role } = FimActivity;

  return (
    <div css={styDataDiriWrapper}>
      <Row>
        <Col span={24}>
          <h2>DATA DIRI</h2>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
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
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Golongan Darah</label>
            <span>{bloodGroup}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Hobi</label>
            <span>{hobby}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>No Darurat</label>
            <span>{emergencyPhone}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div css={styInfo}>
            <label>Agama</label>
            <span>{religion}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>No HP</label>
            <span>{phone}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Institusi</label>
            <span>{institution}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Apakah memiliki keahlian video editing?</label>
            <span>{isAbleVideoEditing}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Portfolio Video Editing</label>
            <span>
              <a
                href={videoEditingPortofolioUrl}
                target='_blank'
                rel='noreferrer'
              >
                {videoEditingPortofolioUrl}
              </a>
            </span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Profesi/Jabatan</label>
            <span>{occupation}</span>
          </div>
        </Col>

        <Col span={8}>
          <div css={styInfo}>
            <label>Sertifikasi Keahlian</label>
            <div className='sertifikat-keahlian'>
              {firstCertificateUrl && (
                <a href={firstCertificateUrl} target='_blank' rel='noreferrer'>
                  <div className='sertifikan-item'>
                    <Icon type='book' />
                  </div>
                </a>
              )}

              {secondCertificateUrl && (
                <a href={secondCertificateUrl} target='_blank' rel='noreferrer'>
                  <div className='sertifikan-item'>
                    <Icon type='book' />
                  </div>
                </a>
              )}

              {thirdCertificateUrl && (
                <a href={thirdCertificateUrl} target='_blank' rel='noreferrer'>
                  <div className='sertifikan-item'>
                    <Icon type='book' />
                  </div>
                </a>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <div css={styInfo}>
            <label>Akun Media Sosial</label>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={stySocialMediaWrapper}>
            <Icon className='icon' type='twitter-circle' theme='filled' />{' '}
            <a src={twitterUrl} target='_blank' rel='noreferrer'>
              <span>{twitterUrl}</span>
            </a>
          </div>
        </Col>

        <Col span={8}>
          <div css={stySocialMediaWrapper}>
            <Icon className='icon' type='facebook' theme='filled' />{' '}
            <a src={facebookUrl} target='_blank' rel='noreferrer'>
              <span>{facebookUrl}</span>
            </a>
          </div>
        </Col>

        <Col span={8}>
          <div css={stySocialMediaWrapper}>
            <Icon className='icon' type='instagram' theme='filled' />{' '}
            <a src={instagramUrl} target='_blank' rel='noreferrer'>
              <span>{instagramUrl}</span>
            </a>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={stySocialMediaWrapper}>
            <Icon className='icon' type='global' />{' '}
            <a src={otherSiteUrl} target='_blank' rel='noreferrer'>
              <span>{otherSiteUrl}</span>
            </a>
          </div>
        </Col>

        <Col span={8}>
          <div css={stySocialMediaWrapper}>
            <Icon className='icon' type='link' />{' '}
            <a src={otherSiteUrl} target='_blank' rel='noreferrer'>
              <span>{websiteUrl}</span>
            </a>
          </div>
        </Col>

        <Col span={8}>
          <div css={styInfo}>
            <label>Alasan tidak memiliki Social Media</label>
            <span>{reason}</span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <h2>Referensi Alumni FIM</h2>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Nama Lengkap</label>
            <span>{fulnameReference}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>No HP</label>
            <span>{phoneNumber}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Mengenal Sebagai Apa</label>
            <span>{relationship}</span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Angkatan FIM</label>
            <span>{batch}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Kenal Berapa Lama</label>
            <span>{acquaintedSince}</span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <h2>Keaktifan FIM</h2>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Tugas/Tanggung Jawab</label>
            <span>{responsibility}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Durasi Kegiatan</label>
            <span>{duration}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Hasil Kegiatan</label>
            <span>{result}</span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <div css={styInfo}>
            <label>Peran</label>
            <span>{role}</span>
          </div>
        </Col>
        <Col span={8}>
          <div css={styInfo}>
            <label>Skala Kegiatan</label>
            <span>{eventScale}</span>
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      {OrganizationExperiences.map((organization, index) => {
        const { duration, eventScale, id, referencePerson, result, role } =
          organization;

        return (
          <>
            <Row>
              <Col span={24}>
                <h2>Keaktifan Organisasi {index + 1}</h2>
              </Col>
            </Row>

            <Row style={{ marginBottom: '20px' }}>
              <Col span={8}>
                <div css={styInfo}>
                  <label>Tugas/Tanggung Jawab</label>
                  <span>{role}</span>
                </div>
              </Col>
              <Col span={8}>
                <div css={styInfo}>
                  <label>Durasi Kegiatan</label>
                  <span>{duration}</span>
                </div>
              </Col>
              <Col span={8}>
                <div css={styInfo}>
                  <label>Hasil Kegiatan</label>
                  <span>{result}</span>
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: '20px' }}>
              <Col span={8}>
                <div css={styInfo}>
                  <label>Referensi / Penangungg Jawab</label>
                  <span>{referencePerson}</span>
                </div>
              </Col>
              <Col span={8}>
                <div css={styInfo}>
                  <label>Skala Kegiatan</label>
                  <span>{eventScale}</span>
                </div>
              </Col>
            </Row>

            <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
              <hr />
            </Row>
          </>
        );
      })}
    </div>
  );
};

DataDiri.propTypes = {
  dataParticipant: object,
  isLoading: bool,
};

export default DataDiri;
