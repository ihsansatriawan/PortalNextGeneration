import React, { useEffect, useState, Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import { Result, Input, Icon, Button, Skeleton, List, Avatar, Carousel, Table, message } from 'antd';
import { fetch } from '@helper/fetch';
import Router from 'next/router';
import { newAuth } from '@HoC/withNewAuth';

const Assesment = (props) => {

  const { cookieLogin } = props

  let decode = {}

  try {
    decode = jwtDecode(cookieLogin)

  } catch (error) {
    message.error("Anda harus login terlebih dahulu")
  }

  const [dataSource, setDataSource] = useState([
    {
      ktp: 'Loading Data...',
      name: 'Loading Data...',
      jalur: 'Loading Data...',
    },
    {
      ktp: 'Loading Data...',
      name: 'Loading Data...',
      jalur: 'Loading Data...',
    },
  ])


  const columns = [
    {
      title: 'Nomor KTP',
      dataIndex: 'ktp',
      key: 'ktp',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Jalur',
      dataIndex: 'jalur',
      key: 'jalur',
    },
    {
      title: 'Regional',
      dataIndex: 'regional',
      key: 'regional',
    },
    // {
    //   title: 'Data Diri',
    //   dataIndex: 'datadiri',
    //   key: 'datadiri',
    // },
    // {
    //   title: 'Aktivitas',
    //   dataIndex: 'aktivitas',
    //   key: 'aktivitas',
    // },
    // {
    //   title: 'Project',
    //   dataIndex: 'project',
    //   key: 'project',
    // },
    // {
    //   title: 'Lainnya',
    //   dataIndex: 'lainnya',
    //   key: 'lainnya',
    // },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={(e) => onNilaiSekarang(e, record.ktp, record.TunnelId)}>Nilai Sekarang</a>
        </span>
      ),
    },
  ];

  const onNilaiSekarang = (e, ktpNumber, TunnelId) => {
    e.preventDefault();
    Router.push(`/detail-participant?ktpNumber=${ktpNumber}&TunnelId=${TunnelId}`)
  }

  useEffect(() => {
    const fetchDataAgain = async () => {
      const { token_FIM, step } = await newAuth(props.cookieLogin);
      token_FIM && fetchListPeserta();
    }
    fetchDataAgain();

  }, [])

  const fetchListPeserta = async (ktpNumber) => {
    const payload = {
      emailRecruiter: decode.email,
    }

    const fetchedData = [];

    // setIsLoading(true);
    const { cookieLogin, refetchStep } = props;
    try {
      const response = await fetch({
        url: ktpNumber ? `recruiter/participant/by-recruiter?ktpNum=${ktpNumber}` : 'recruiter/participant/by-recruiter',
        method: 'post',
        headers: {
          'Authorization': `Bearer ${cookieLogin}`,
        }, data: {
          ...payload
        }
      })

      const status = (response.data.status || false)

      if (!status) {
        message.error(response.data.message)
        // setIsLoading(false);
      } else {
        response.data.data.map((value, index) => {
          fetchedData.push({
            ktp: value.ktpNumber,
            name: value.Identity.name,
            jalur: value.Tunnel.name,
            aktivitas: value.scoreAktivitas,
            datadiri: value.scoreDataDiri,
            lainnya: value.scoreOther,
            project: value.scoreProject,
            TunnelId: value.TunnelId,
            regional: value.Identity.User.Regional.city
          })
        })

        setDataSource(fetchedData)

        // message.success(response.data.message)
        // fetchAllParticipantTersisa();
        // fetchAllParticipantAssign();
        // setAllParticipantAvailable(response.data.data)
      }

    } catch (error) {
      console.log("Error: ", error)
      message.error("Something Error")
      // setIsLoading(false);
    }
  }

  const searchHandling = (ktpNumber) => {
    fetchListPeserta(ktpNumber)
  }


  return (
    <Fragment>
      <div>
        <h1>Halo Selamat Datang {decode.email || ''} </h1>
        <div>
          <Input.Search
            style={{ marginTop: '20px' }}
            placeholder="Masukkan Nomor KTP"
            enterButton
            onSearch={searchHandling}
          />
        </div>
        {/* <p>Ada {dataSource.length} Kandidat FIM yang harus kamu nilai untuk lolos mengikuti pelatihan FIM</p> */}
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </Fragment>
  )
}

export default Assesment;