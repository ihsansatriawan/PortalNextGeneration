import React, { useEffect, useState, useCallback } from 'react';
import { Icon, Tabs, Button, Modal, Typography, notification } from 'antd';
import { string, number } from 'prop-types';
import { fetch } from '@helper/fetch';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import PenilaianIllu from '@components/assets/illu-penilaian.svg';
import Router from 'next/router';
import DataDiri from './DataDiri';
import Essay from './Essay';

import {
  styDetailParticipantWrapper,
  styHeader,
  styStatusBar,
  styBody,
  stySubmitWrapperButton,
  styButtonSave,
  styButtonWrapper,
} from './style';

const { Title } = Typography;

const { TabPane } = Tabs;
const DetailParticipant = (props) => {
  const { userid, cookieLogin } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [dataParticipant, setDataParticipant] = useState({});
  const [modalSendShow, setModalSendShow] = useState(false);
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);

  let fullNameParticipant;
  let recruiterEmail;

  const fetchDataDetailParticipant = useCallback(async () => {
    try {
      const response = await fetch({
        url: `/participant/${userid}?batch=23`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const dataParticipantDetail = response.data.data;
      setDataParticipant(dataParticipantDetail);
      if (dataParticipantDetail) {
        const isFinal = dataParticipantDetail.Summaries.finalScore !== null;
        setIsFinalSubmit(isFinal);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeTab = (key) => {
    console.log(key);
    console.log('key');
  };

  const onConfirmOK = async () => {
    try {
      const response = await fetch({
        url: `/participant/assessment/submit`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: {
          participantId: userid,
          batch: '23',
        },
      });

      const isSuccess = response.data.status;

      if (isSuccess) {
        notification.success({ message: 'Berhasil Submit Nilai Peserta' });
        setModalSendShow(true);
      } else {
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataDetailParticipant();
  }, []);

  if (isLoading) {
    return <LoadingSpin />;
  }

  if (dataParticipant.Identity) {
    const { fullName } = dataParticipant.Identity;
    fullNameParticipant = fullName;
  }

  if (dataParticipant.Recruiter) {
    recruiterEmail = dataParticipant.Recruiter.email;
  }

  const ModalConfirm = () => {
    return (
      <Modal
        closable={false}
        visible={modalSendShow}
        onOk={onConfirmOK}
        onCancel={() => setModalSendShow(false)}
        footer={null}
        width='400px'
      >
        <PenilaianIllu />
        <Title level={4} style={{ marginTop: '20px' }}>
          Udah Yakin Sama Penilaian Kamu?
        </Title>
        <p>
          Pastikan kamu sudah yakin dengan penilaian kamu ya. Setelah submit
          nilai, kamu tidak dapat mengubah atau mengedit nilai lagi lho!
        </p>
        <div css={styButtonWrapper}>
          <Button
            className='batal'
            size='large'
            onClick={() => setModalSendShow(false)}
          >
            Batal
          </Button>
          <Button className='submit' size='large' onClick={onConfirmOK}>
            Submit Sekarang
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <div css={styDetailParticipantWrapper}>
      <div css={styHeader}>
        <div>
          <Icon
            type='arrow-left'
            className='icon-back'
            onClick={() => Router.push('/recruiter')}
          />
          <span className='title-name'>
            Detail Formulir - {fullNameParticipant}
          </span>
        </div>

        <div css={styStatusBar}>
          <span>Rekruiter: {recruiterEmail}</span>
          <div className='status'>
            {isFinalSubmit ? (
              <>
                <Icon
                  type='check-circle'
                  theme='filled'
                  style={{ color: '#8fd401' }}
                />{' '}
                Sudah Dinilai
              </>
            ) : (
              <>
                <Icon type='check-circle' /> Belum Dinilai
              </>
            )}
          </div>
        </div>
      </div>

      <div css={styBody}>
        <Tabs defaultActiveKey='1' onChange={onChangeTab}>
          <TabPane tab='Informasi Utama' key='1'>
            <DataDiri
              {...props}
              dataParticipant={dataParticipant}
              isLoading={isLoading}
              isFinalSubmit={isFinalSubmit}
            />
          </TabPane>
          <TabPane tab='Essay' key='2'>
            <Essay
              dataParticipant={dataParticipant}
              isFinalSubmit={isFinalSubmit}
              {...props}
              category='essay'
            />
          </TabPane>
          <TabPane tab='Rencana Pengabdian' key='3'>
            <Essay
              dataParticipant={dataParticipant}
              isFinalSubmit={isFinalSubmit}
              {...props}
              category='volunteering_plan'
            />
          </TabPane>
        </Tabs>
      </div>

      {!isFinalSubmit && (
        <div css={stySubmitWrapperButton}>
          <Button
            size='large'
            css={styButtonSave}
            type='primary'
            htmlType='submit'
            onClick={() => {
              setModalSendShow(true);
            }}
          >
            <Icon type='save' theme='filled' /> Submit Nilai
          </Button>
        </div>
      )}

      {modalSendShow && <ModalConfirm />}
    </div>
  );
};

DetailParticipant.propTypes = {
  userid: number,
  cookieLogin: string,
};

export default DetailParticipant;
