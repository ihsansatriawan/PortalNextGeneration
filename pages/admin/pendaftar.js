import React, { useEffect, useState } from 'react';
import AdminPage from '.';
import { fetch } from '@helper/fetch';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
    Table,
    Radio,
    DatePicker,
    Upload,
    Skeleton
} from "antd";

import './pendaftar.css';
import Assign from '../../components/Recruiter/Assign/Assign';

const PendaftarPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState({
        allregistration: '...'
    })

    useEffect(() => {
        fetchSemuaPendaftar()
    }, [])

    const [allParticipants, setAllParticipants] = useState([
        {
            ktp: 'Loading Data...',
            name: 'Loading Data...',
            jalur: 'Loading Data...',
            recruiter: 'Loading Data...',
            regional: 'Loading Data...',

        },
        {
            ktp: 'Loading Data...',
            name: 'Loading Data...',
            jalur: 'Loading Data...',
            recruiter: 'Loading Data...',
            regional: 'Loading Data...',
        },
    ])

    const columns = [
        {
            title: 'Nomor KTP',
            dataIndex: 'ktpNumber',
            key: 'ktpNumber'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Regional',
            dataIndex: 'User.Regional.city',
            key: 'User.Regional.city',
        },
        {
            title: 'Jalur',
            dataIndex: 'Summaries[0].Tunnel.name',
            key: 'Summaries[0].Tunnel.name',
        },
        {
            title: 'Recruiter',
            key: 'recruiter',
            render: (text, record) => (
                <span>
                    <div style={{
                        background: '#f0f2f5',
                        padding: '5px',
                        paddingRight: '10px',
                        marginTop: '2px',
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: '9px',
                        position: 'relative'
                    }}>
                        Bagus Dwi Utama
                        <div style={{
                            background: 'grey',
                            color: 'white',
                            width: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '0'
                        }}>x</div>
                    </div>
                </span>
            ),
        },
        {
            title: 'Assign',
            key: 'assign',
            render: (text, record) => (
                <span>
                    <Assign />
                    {/* <a onClick={(e) => onNilaiSekarang(e, record.ktp, record.TunnelId)}>Nilai Sekarang</a> */}
                </span>
            ),
        }
    ]

    const fetchRecruiter = async () => {
        const { cookieLogin, refetchStep } = this.props;
        this.setState({ isLoading: true })
        try {
          const response = await fetch({
            url: '/recruiter/lists',
            method: 'get',
            headers: {
              'Authorization': `Bearer ${cookieLogin}`
            }
          })
    
          const status = (response.data.status || false)
    
          if (!status) {
            message.error(response.data.message)
            // this.setState({ isLoading: false })
          } else {
            // message.success(response.data.message)
            // this.setState({
            //   isLoading: false,
            //   recruiters: response.data.data
            // })
          }
    
        } catch (error) {
          message.error("Server Error")
        //   this.setState({ isLoading: false })
        }
      }
    

    const fetchSemuaPendaftar = async () => {
        setIsLoading(true);
        const { cookieLogin, refetchStep } = props;
        try {
            const response = await fetch({
                url: 'recruiter/participant/submited',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`,
                }, data: {}
            })

            const status = (response.data.status || false)

            if (!status) {
                message.error(response.data.message)
                setIsLoading(false);
            } else {

                message.success(response.data.message)
                setIsLoading(false);
                setAllParticipants(response.data.data.rows)
                setStatistics({
                    allregistration: response.data.data.count
                })
            }

        } catch (error) {
            console.log(error)
            message.error("Server Error")
            setIsLoading(false);
        }
    }

    return (
        <AdminPage>
            <div className="card-dashboard-statistic">
                <div className="card-statistic">
                    <h4>Jumlah Pendaftar Final Submit</h4>
                    <h2>{statistics.allregistration}</h2>
                </div>

            </div>

            <div className="table-wrapper" style={{ marginTop: '20px', background: 'white' }}>
                <Table dataSource={allParticipants} columns={columns} />
            </div>
        </AdminPage>
    )
}

export default PendaftarPage;