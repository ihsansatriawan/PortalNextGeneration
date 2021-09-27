import React from 'react';
import { useIdentity } from '@context/profileContext';
import { styHeaderWrapper } from './style';

const Header = () => {
  const { Identity } = useIdentity();

  return (
    <div css={styHeaderWrapper}>
      <h1>Halo, {Identity ? Identity.firstName : ''}!</h1>
      <p>
        Selamat datang di website pendaftaran FIM 23. Yuk lengkapi seluruh form
        dan dokumen pendaftaran.
      </p>
    </div>
  );
};

export default Header;
