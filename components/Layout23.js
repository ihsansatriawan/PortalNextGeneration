import React, { Component, useState, useEffect } from 'react';
import Head from 'next/head';
import '../static/css/empty.css';
import { Avatar, Breadcrumb, Icon, Layout as LayoutAntd, Menu } from 'antd';
import Router from 'next/router';
import MenuItem from 'antd/lib/menu/MenuItem';
import ListMenu from './ListMenu';
import { LoginComponent } from '@components/Login';
import './layout.css';

const { Header, Footer, Sider, Content } = LayoutAntd;
const { SubMenu } = Menu;

function Layout(props) {
  const [current, setCurrent] = useState('');
  const { children, pathName, cookieLogin } = props;

  useEffect(() => {
    setCurrent(pathName);
  }, [pathName]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Head>
        <title>Portal Forum Indonesia Muda</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/static/img/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/img/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/img/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/static/img/favicon/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <div>
        {children}
        <Footer style={{ textAlign: 'center' }}>FIM Engineering ©2021</Footer>
      </div>
    </div>
  );
}

export default Layout;
