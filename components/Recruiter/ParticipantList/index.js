import React, { useCallback, useEffect, useState } from 'react';
import { string } from 'prop-types';
import FilterCard from '../FilterCard';
import { fetch } from '@helper/fetch';
import ParticipantCard from './ParticipantCard';
import LoadingSpin from '@components/FIM23/LoadingSpin.js';
import { Pagination } from 'antd';
import { useIdentity } from '@context/profileContext';

import Router from 'next/router';
import { notification } from 'antd';

const ParticipantList = (props) => {
  const { cookieLogin } = props;
  const { dataUser } = useIdentity();

  const [listParticipants, setListParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecruiterList, setIsLoadingRecruiterList] = useState(false);
  const [totalData] = useState(1500);
  const [currentPage, setCurrentPage] = useState(1);
  const [listRecruiter, setListRecruiter] = useState([]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Anda tidak dapat mengakses halaman ini',
    });
  };

  const fetchListRecruiter = async () => {
    setIsLoadingRecruiterList(true);
    try {
      const response = await fetch({
        url: '/recruiter/lists',
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      const status = response.data.status || false;

      if (!status) {
        notification.error(response.data.message);
        setIsLoadingRecruiterList(false);
      } else {
        setIsLoadingRecruiterList(false);
        setListRecruiter(response.data.data);
      }
    } catch (error) {
      notification.error('Server Error');
      setIsLoadingRecruiterList(false);
    }
  };

  const fetchDataListParticipant = useCallback(async () => {
    try {
      const response = await fetch({
        url: `/participant?batch=23&offset=${currentPage * 10 - 10}&limit=10`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
      });

      if (response.data.status) {
        const dataParticipantList = response.data.data;
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
    if (dataUser.role < 2) {
      Router.push('/');
      openNotificationWithIcon('error');
    } else {
      fetchListRecruiter();
    }

    setIsLoading(true);
    fetchDataListParticipant();
  }, [currentPage]);

  const onChangeRecruiter = async (email, userId) => {
    try {
      const response = await fetch({
        url: `/recruiter/assign`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${cookieLogin}`,
        },
        data: {
          participantId: userId,
          recruiterEmail: email,
          batch: '23',
        },
      });

      if (response.data.status) {
        notification.success({ message: response.data.message });
      } else {
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          recruiterEmail,
          scoreFinal,
        } = participant;

        return (
          <ParticipantCard
            key={userId}
            photoUrl={photoUrl}
            fullName={fullName}
            cityAddress={cityAddress}
            occupation={occupation}
            userId={userId}
            userRole={dataUser.role}
            listRecruiter={listRecruiter}
            onChangeRecruiter={onChangeRecruiter}
            recruiterEmail={recruiterEmail}
            scoreFinal={scoreFinal}
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
