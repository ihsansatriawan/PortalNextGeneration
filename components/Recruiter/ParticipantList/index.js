import React, { useCallback, useEffect, useState } from 'react';
import { string } from 'prop-types';
import FilterCard from '../FilterCard';
import { fetch } from '@helper/fetch';
import ParticipantCard from './ParticipantCard';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import { Pagination } from 'antd';
import Router from 'next/router';
import { notification } from 'antd';

const ParticipantList = (props) => {
  const { cookieLogin } = props;
  const [listParticipants, setListParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalData, setTotalData] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Anda tidak dapat mengakses halaman ini',
    });
  };

  const fetchDataListParticipant = useCallback(async () => {
    try {
      const response = await fetch({
        url: `/participant?batch=23&offset=${currentPage - 1}&limit=10`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      if (response.data.status) {
        const dataParticipantList = response.data.data;
        console.log(dataParticipantList);
        console.log('dataParticipantList');
        setListParticipants(dataParticipantList);
      } else {
        Router.push('/');
        openNotificationWithIcon('error');
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  const onChangePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDataListParticipant();
  }, [currentPage]);

  if (isLoading) {
    return <LoadingSpin />;
  }

  return (
    <div>
      {/* <FilterCard /> */}
      {listParticipants.map((participant) => {
        const {
          userId,
          fullName,
          cityAddress,
          occupation,
          photoUrl = '',
        } = participant;

        return (
          <ParticipantCard
            key={userId}
            photoUrl={photoUrl}
            fullName={fullName}
            cityAddress={cityAddress}
            userId={userId}
          />
        );
      })}
      <Pagination
        defaultCurrent={currentPage}
        total={totalData}
        onChange={onChangePagination}
      />
    </div>
  );
};

ParticipantList.propTypes = {
  cookieLogin: string,
};

export default ParticipantList;
