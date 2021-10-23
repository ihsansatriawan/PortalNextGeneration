import React, { useState } from 'react';
import { object, bool, string } from 'prop-types';
import { Row, Col, Icon, Input, Button, notification } from 'antd';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import { fetch } from '@helper/fetch';

import {
  styDataDiriWrapper,
  styPrimaryIdentity,
  styPhotoProfileWrapper,
  styBasicInfo,
  styInfo,
  stySocialMediaWrapper,
  styCardNilai,
} from './style';

import BerkasDisplay from './BerkasDisplay';

const DataDiri = (props) => {
  const { isLoading, cookieLogin } = props;
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [scoreIdentity, setScoreIdentity] = useState({
    identityScore: 0,
    socialMediaScore: 0,
  });
  const {
    Identity,
    Skill,
    SocialMedia,
    AlumniReference,
    FimActivity,
    OrganizationExperiences,
    PersonalDocument,
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

  const { commitmentLetterUrl, identityFileUrl, recommendationLetterUrl } =
    PersonalDocument;

  const { duration, eventScale, responsibility, result, role } = FimActivity;

  const handleChangeScore = (e, name) => {
    e.preventDefault();

    const value = e.target.value;
    setScoreIdentity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveScore = async () => {
    setIsLoadingSave(true);

    const payload = scoreIdentity;

    try {
      const response = await fetch({
        url: `/participant/${props.userid}/batch/23/assessment`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: payload,
      });

      const status = response.status || false;

      if (!status) {
        notification.error({ message: response.data.message });
      } else {
        notification.success({ message: response.data.message });
        setIsLoadingSave(false);
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Gagal disimpan' });
      setIsLoadingSave(false);
    }
  };

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
      <Row>
        <div css={styCardNilai}>
          <strong>Berikan Nilai kualitas sosial media (Max 4 Poin)</strong>
          <Input
            className='input-field'
            defaultValue={SocialMedia.score}
            onChange={(e) => handleChangeScore(e, 'socialMediaScore')}
          />

          {SocialMedia.score ? (
            <div style={{ marginLeft: '10px', fontSize: '20px' }}>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            ''
          )}
        </div>
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
        const { duration, eventScale, referencePerson, result, role } =
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

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <h2>SURAT KOMITMEN</h2>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <BerkasDisplay url={commitmentLetterUrl} />
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <h2>SURAT REKOMENDASI</h2>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <BerkasDisplay url={recommendationLetterUrl} />
        </Col>
      </Row>

      <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
        <hr />
      </Row>

      <Row>
        <Col span={24}>
          <h2>SCAN KTP</h2>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <BerkasDisplay url={identityFileUrl} />
        </Col>
      </Row>

      <Row>
        <div css={styCardNilai}>
          <strong>Berikan Nilai kualitas Data Diri (Max 2 Poin)</strong>
          <Input
            className='input-field'
            defaultValue={Identity.score}
            onChange={(e) => handleChangeScore(e, 'identityScore')}
          />
          <Button
            className='save-btn'
            loading={isLoadingSave}
            onClick={handleSaveScore}
          >
            {isLoadingSave ? 'Loading...' : 'Simpan'}
          </Button>
          {Identity.score ? (
            <div style={{ marginLeft: '10px', fontSize: '20px' }}>
              <Icon
                type='check-circle'
                theme='twoTone'
                twoToneColor='#52c41a'
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </Row>
    </div>
  );
};

DataDiri.propTypes = {
  dataParticipant: object,
  isLoading: bool,
  cookieLogin: string,
  userid: string,
};

export default DataDiri;
