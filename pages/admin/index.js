import React, { useEffect, useState } from 'react';
import { logout } from '@helper/googleSession';
import { fetch } from '@helper/fetch';
import Router from 'next/router';
import {
    Layout,
    Menu,
    Breadcrumb,

    Divider,
    Empty,
    notification,
    Skeleton,
    Steps,
    Result,
    Button,
    message
} from 'antd';
import MenuAdmin from '../../components/Admin/MenuAdmin/MenuAdmin';

import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const AdminPage = (props) => {


    useEffect(() => {
        fetchDataProfile()
    }, [])

    const fetchDataProfile = async () => {
        // mengatur hak akses yang hanya boleh masuk halaman admin berdasarkan table identity role
        const { cookieLogin } = props;

        try {
            const response = await fetch({
                url: '/auth/get-profile',
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${cookieLogin}`
                },
            })

            const status = (response.data.status || false)

            if (status) {
                if (response.data.data) {
                    // console.log(response.data.data.data.Identity.role !== 3)
                    if (response.data.data.Identity.role !== 3) {
                        message.success('Mohon maaf kamu belum bisa untuk mengakses halaman ini')
                        Router.push('/')
                    }
                }
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="9" onClick={() => { Router.push('/admin/pendaftar') }}>Pendaftar</Menu.Item>
                        <Menu.Item key="8" onClick={() => { Router.push('/admin/recruiter') }}>Recruiter</Menu.Item>
                        <Menu.Item key="12">Hasil Penilaian</Menu.Item>

                        <hr></hr>
                        <Menu.Item key="13">Regional</Menu.Item>
                        <Menu.Item key="14">Angkatan FIM</Menu.Item>                        
                        

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 0,
                            margin: 0,
                            minHeight: 280,
                            paddingRight: '0px'
                        }}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default AdminPage;