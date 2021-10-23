import React from 'react';
import { useIdentity } from '@context/profileContext';
import { styHeaderWrapper } from './style';

const Header = ({ isRecruiter }) => {
  const { Identity } = useIdentity();

  return (
    <div css={styHeaderWrapper}>
      <h1>Halo, {Identity ? Identity.firstName : ''}!</h1>
      <p>
        {isRecruiter
          ? 'Cie recruiter FIM. Semangat ya. Kasih power wush wush wushhh!!!'
          : 'Selamat datang di website pendaftaran FIM 23. Yuk lengkapi seluruh form dan dokumen pendaftaran.'}
      </p>
    </div>
  );
};

export default Header;
