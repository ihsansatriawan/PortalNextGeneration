import React, { useEffect, useState } from 'react';
import LogoFim from '@components/Home/Slider/assets/logo-fim.svg';
import Router from 'next/router';
import { string } from 'prop-types';
import { notification } from 'antd';
import { fetch } from '@helper/fetch';

import StepDesktop from '@components/FIM23/StepDesktop';
import MenuFIMDesktop from '@components/FIM23/MenuFIMDesktop';
import Header from '@components/FIM23/Header';

import People from '@components/assets/icon/daftar-capes.svg';
import Checklist from '@components/assets/icon/sudah-dinilai.svg';
import ArchivePeople from '@components/assets/icon/capes-diarsipkan.svg';

import ParticipantList from './ParticipantList';
import DetailParticipant from './DetailParticipant';

import {
  styFormWrapper,
  stySidebarWrapper,
  styMainFormWrapper,
  styLogo,
  styMenuDekstopLogic,
} from '@components/FIM23/style';

const ContainerRecruiter = (props) => {
  const { userid, cookieLogin } = props;
  const [statistic, setStatistic] = useState({
    archived_number: 0,
    processed_number: 0,
    submitted_number: 0,
  });

  const stepList = [
    {
      id: 1,
      name: 'Daftar Capes',
      description: 'Semua capes yang sudah mendaftar ada di sini',
      type: 'isFirstStepCompleted',
      icon: <People />,
      count: statistic.submitted_number,
    },
    {
      id: 2,
      name: 'Sudah Dinilai',
      description: 'Di sini isinya capes yang sudah dinilai oleh recruiter',
      type: 'isSecondStepCompleted',
      icon: <Checklist />,
      count: statistic.processed_number,
    },
    {
      id: 3,
      name: 'Capes Diarsipkan',
      description: 'Cek keseluruhan data formulir kamu sebelum dikirim ya!',
      type: 'isSecondStepCompleted',
      icon: <ArchivePeople />,
      count: statistic.archived_number,
    },
  ];

  const fetchStatisticStatusPenilaian = async () => {
    try {
      const response = await fetch({
        url: '/participant/summaries?batch=23',
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.data.status || false;
      const responseData = response.data.data;

      if (!status) {
        notification.error(response.data.message);
      } else {
        setStatistic(responseData);
      }
    } catch (error) {
      notification.error('Server Error');
    }
  };

  useEffect(() => {
    fetchStatisticStatusPenilaian();
  }, []);

  const RenderView = () => {
    if (userid) {
      return <DetailParticipant {...props} />;
    }

    return <ParticipantList {...props} />;
  };

  return (
    <div css={styFormWrapper}>
      <div css={stySidebarWrapper}>
        <LogoFim
          style={{ zIndex: '2' }}
          onClick={() => Router.push('/')}
          className={styLogo}
        />

        <StepDesktop liststep={stepList} step={1} />

        <div css={styMenuDekstopLogic}>
          <MenuFIMDesktop />
        </div>
      </div>

      <div css={styMainFormWrapper}>
        <Header />
        <RenderView />
      </div>
    </div>
  );
};

ContainerRecruiter.propTypes = {
  userid: string,
  cookieLogin: string,
};

export default ContainerRecruiter;
