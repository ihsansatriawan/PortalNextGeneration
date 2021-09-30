import React from 'react';
import { Icon } from 'antd';
import { func } from 'prop-types';
import { styMenuDesktopWrapper } from './style';

const MenuFIMDesktop = (props) => {
  const { onLogout, onRedirectPengumuman } = props;

  return (
    <div css={styMenuDesktopWrapper}>
      <div className='menu-item' onClick={onRedirectPengumuman}>
        <Icon type='bell' />
        <span>Pengumuman</span>

        <div className='count'>0</div>
      </div>

      <div className='menu-item' onClick={onLogout}>
        <Icon type='logout' />
        <span>Logout</span>
      </div>
    </div>
  );
};

MenuFIMDesktop.propTypes = {
  onLogout: func,
  onRedirectPengumuman: func,
  onClose: func,
};

export default MenuFIMDesktop;
