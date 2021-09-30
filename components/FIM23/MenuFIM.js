import React from 'react';
import { Icon } from 'antd';
import { func } from 'prop-types';
import { styMenuWrapper, styMenuHeader, styMenuList } from './style';

const MenuFIM = (props) => {
  const { onLogout, onRedirectPengumuman, onClose } = props;

  return (
    <div css={styMenuWrapper}>
      <div css={styMenuHeader}>
        <Icon type='close' onClick={onClose} />
      </div>
      <div css={styMenuList}>
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
    </div>
  );
};

MenuFIM.propTypes = {
  onLogout: func,
  onRedirectPengumuman: func,
  onClose: func,
};

export default MenuFIM;
