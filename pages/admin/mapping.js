import React, { useEffect, useState } from 'react';
import AdminPage from '.';
import { fetch } from '@helper/fetch';
import { SearchOutlined } from '@ant-design/icons';

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
    Skeleton,
    Space
} from "antd";

import './pendaftar.css';
import Assign from '../../components/Recruiter/Assign/Assign';
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import WrapperStatistic from 'antd/lib/statistic/Statistic';

const CheckboxGroup = Checkbox.Group;

const PendaftarPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState({
        allregistration: '...',
        allTunnel: []
    })

    const [isDownloadExcelOpen, setIsDownloadExcelOpen] = useState(false);
    const [plainOptions, setPlainOptions] = useState(['Nama', 'Email', 'Jalur', 'Phone', 'KTP', 'Regional Saat Ini', 'Editing Video Status', 'Next Activity', 'Regional Pengembangan'])
    const [indeterminate, setindeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [isLoadingExcel, setIsLoadingExcel] = useState(false);
    const [isLoadingRecruiter, setIsLoadingRecruiter] = useState(true);
    const [recruiters, setRecruiters] = useState([]);

    // Search state
    

    useEffect(() => {
        fetchSemuaPendaftar()
        fetchRecruiter()
        fetchStatisticCurrentBatch()
    }, [])

    const onChangeRecruiter = (value, ktpNumber) => {
        assignRecruiterToParticipant(value, ktpNumber)
    }



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

    const [filteredParticipant, setFilteredParticipant] = useState(null)

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
            sorter: (a, b) => {
                a = a.name !== null ? a.name : '';
                b = b.name !== null ? b.name : '';
                return a.localeCompare(b)
            }
        },
        {
            title: 'Regional',
            dataIndex: 'User.Regional.city',
            key: 'User.Regional.city',
            sorter: (a, b) => {
                a = a.User !== null && a.User.Regional !== null ? a.User.Regional.city : '';
                b = b.User !== null && b.User.Regional !== null ? b.User.Regional.city : '';
                return a.localeCompare(b)
            }
        },
        {
            title: 'Jalur',
            dataIndex: 'Summaries[0].Tunnel.name',
            key: 'Summaries[0].Tunnel.name',
            sorter: (a, b) => { return a.Summaries[0].Tunnel.name.localeCompare(b.Summaries[0].Tunnel.name) }
        },
        {
            title: 'Recruiter',
            key: 'recruiter',
            render: (text, record) => (
                record.recruiters && record.recruiters.map((value, index) => {
                    return <span>
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
                            {value.nameRecruiter}
                            <div
                                onClick={(e) => getRemoveAction(e, value.recruiterId, value.ktpNumber)}
                                style={{
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
                })

            ),
        },
        {
            title: 'Assign',
            key: 'assign',
            render: (text, record) => (
                <span>
                    <Assign lists={recruiters} onChange={(e) => onChangeRecruiter(e, record.ktpNumber)} />
                    {/* <a onClick={(e) => onNilaiSekarang(e, record.ktp, record.TunnelId)}>Nilai Sekarang</a> */}
                </span>
            ),
        }
    ]

    const fetchRecruiter = async () => {
        const { cookieLogin, refetchStep } = props;
        setIsLoading(true)

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
                setIsLoading(false)
            } else {
                setRecruiters(response.data.data)
                message.success(response.data.message)
                setIsLoading(false)
            }

        } catch (error) {
            message.error("Server Error")
            setIsLoading(false)
            //   this.setState({ isLoading: false })
        }
    }

    const assignRecruiterToParticipant = async (email, ktpParticipant) => {
        const { cookieLogin, refetchStep } = props;
        setIsLoadingRecruiter(true)

        try {
            const response = await fetch({
                url: '/recruiter/new-assign',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`
                }, data: {
                    emailRecruiter: email,
                    ktpParticipant: ktpParticipant
                }
            })

            const status = (response.data.status || false)

            if (!status) {
                message.error(response.data.message)
                setIsLoadingRecruiterRecruiter(false)
            } else {
                fetchSemuaPendaftar();
                message.success(response.data.message)
                setIsLoadingRecruiter(false)
            }

        } catch (error) {
            message.error("Server Error")
            setIsLoadingRecruiter(false)
            //   this.setState({ isLoading: false })
        }
    }

    const getRemoveAction = async (e, recruiterId, ktpNumber) => {
        const { cookieLogin, refetchStep } = props;
        setIsLoadingRecruiter(true)

        try {
            const response = await fetch({
                url: '/recruiter/remove-assign',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`
                }, data: {
                    recruiterId: recruiterId,
                    ktpParticipant: ktpNumber
                }
            })

            const status = (response.data.status || false)

            if (!status) {
                message.error(response.data.message)
                setIsLoadingRecruiterRecruiter(false)
            } else {
                fetchSemuaPendaftar();
                message.success(response.data.message)
                setIsLoadingRecruiter(false)
            }

        } catch (error) {
            message.error("Server Error")
            setIsLoadingRecruiter(false)
            //   this.setState({ isLoading: false })
        }
    }

    const fetchStatisticCurrentBatch = async () => {

        const { cookieLogin, refetchStep } = props;
        try {
            const response = await fetch({
                url: 'summary/statistic-in-batch',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`,
                }, data: {}
            })

            const status = (response.data.status || false)
            console.log(response.data.data)
            if (!status) {
                message.error(response.data.message)
            } else {
                message.success(response.data.message)
                setStatistics({
                    allregistration: response.data.total,
                    allTunnel: response.data.data
                })
            }

        } catch (error) {
            console.log(error)
            message.error("Server Error")
            setIsLoading(false);
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
                setAllParticipants(response.data.data)
            }

        } catch (error) {
            console.log(error)
            message.error("Server Error")
            setIsLoading(false);
        }
    }

    const onChangeCheck = checkedList => {
        setCheckedList(checkedList);
        setindeterminate(!!checkedList.length && checkedList.length < plainOptions.length)
        setCheckAll(checkedList.length === plainOptions.length);
    };

    const onCheckAllChange = e => {

        setCheckedList(e.target.checked ? plainOptions : []);
        setindeterminate(false)
        setCheckAll(e.target.checked);

    };

    const onClickDownloadExcel = async (e) => {

        e.preventDefault();
        const { cookieLogin, refetchStep } = props;
        setIsLoadingExcel(true);
        try {
            const response = await fetch({
                url: 'data/download-excel',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`,
                },
                data: {
                    listCheck: checkedList
                }
            })

            const responData = response.data.data;

            const wb = new ExcelJS.Workbook()
            const ws = wb.addWorksheet()

            const kolomnya = [
                { header: 'Nama', key: 'name', },
                { header: 'Email', key: 'email', },
                { header: 'Phone', key: 'phone', },
                { header: 'KTP', key: 'ktpNumber', },
                { header: 'Jalur', key: 'jalur', },
                { header: 'Regional Saat Ini', key: 'regional', },
                { header: 'Editing Video Status', key: 'videoEdit', },
                { header: 'Next Activity', key: 'nextActivity', },
                { header: 'Regional Pengembangan', key: 'newRegional', },
            ];

            const selectedColom = kolomnya.filter((kol) => {
                return checkedList.includes(kol.header);
            })

            ws.columns = selectedColom;
            responData.map((value) => {
                ws.addRow({
                    ...value
                })
            })

            const buf = await wb.xlsx.writeBuffer()
            saveAs(new Blob([buf]), 'data-calon-pendaftar-fim.xlsx')
            setIsLoadingExcel(false);

        } catch (error) {
            console.log(error)
            message.error("Server Error")
            setIsLoading(false);
            setIsLoadingExcel(false);
        }
    }


    const searchHandling = value => {
        
        const filterTable = allParticipants.filter(o =>
          Object.keys(o).some(k =>
            String(o[k])
              .toLowerCase()
              .includes(value.toLowerCase())
          )
        );
    
        setFilteredParticipant(filterTable);
      };

    return (
        <AdminPage>
            <div className="buttonwrapper-excel">
                <Button onClick={() => setIsDownloadExcelOpen(!isDownloadExcelOpen)}>Download Data Excel</Button>

                {isDownloadExcelOpen ? (
                    <Checkbox
                        style={{ marginLeft: '20px' }}
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >   Check all
                    </Checkbox>
                ) : null}
            </div>

            {isDownloadExcelOpen ? (
                <div className="checklist-check-excel-download">
                    <CheckboxGroup
                        options={plainOptions}
                        value={checkedList}
                        onChange={onChangeCheck}
                    />

                    {!isLoadingExcel ? (
                        <Button style={{ marginTop: '10px' }} onClick={(e) => onClickDownloadExcel(e)} type="primary">Download</Button>
                    ) : "Downloading..."}
                </div>
            ) : null}



            <div className="card-dashboard-statistic">
                <div className="card-statistic">
                    <h4>Jumlah Pendaftar</h4>
                    <h2>{statistics.allregistration}</h2>
                </div>
                {statistics.allTunnel.map((value) => {
                    return <div className="card-statistic">
                        <h4>{value.nameTunnel}</h4>
                        <h2>{value.countFinal}/{value.count}</h2>
                        <table>
                            {value.detailByRegional.map((valudes, index) => {
                                const filtering = value.detailByRegionalFinal.filter((item) => {
                                    return valudes.city == item.city
                                })

                                return <tr>
                                    <td>{valudes.city}</td>  <td>:</td> <td>{filtering[0] ? filtering[0].count : 0} /{valudes.count}</td>
                                </tr>
                            })}
                        </table>
                    </div>
                })}
            </div>

            <div>
                <Input.Search
                    style={{ marginTop: '20px' }}
                    placeholder="Search by..."
                    enterButton
                    onSearch={searchHandling}
                />
            </div>

            <div className="table-wrapper" style={{ marginTop: '20px', background: 'white' }}>
                <Table dataSource={filteredParticipant == null ? allParticipants : filteredParticipant} columns={columns} />
            </div>
        </AdminPage>
    )
}

export default PendaftarPage;