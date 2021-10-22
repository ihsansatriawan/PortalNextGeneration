import React, { useEffect, useState, useCallback } from 'react';
import { Icon, Tabs } from 'antd';
import { string, number } from 'prop-types';
import { fetch } from '@helper/fetch';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import Router from 'next/router';
import DataDiri from './DataDiri';
import Essay from './Essay';

import {
  styDetailParticipantWrapper,
  styHeader,
  styStatusBar,
  styBody,
} from './style';

const { TabPane } = Tabs;
const DetailParticipant = (props) => {
  const { userid, cookieLogin } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [dataParticipant, setDataParticipant] = useState({});

  let fullNameParticipant;

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

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeTab = (key) => {
    console.log(key);
    console.log('key');
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
          <span>Rekruiter: </span>
          <div className='status'>
            {/* <Icon type='check-circle' theme='filled' /> */}
            {/* <Icon type='check-circle' /> Belum Dinilai */}
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
            />
          </TabPane>
          <TabPane tab='Essay' key='2'>
            <Essay
              dataParticipant={dataParticipant}
              {...props}
              category='essay'
            />
          </TabPane>
          <TabPane tab='Rencana Pengabdian' key='3'>
            <Essay
              dataParticipant={dataParticipant}
              {...props}
              category='volunteering_plan'
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

DetailParticipant.propTypes = {
  userid: number,
  cookieLogin: string,
};

export default DetailParticipant;
