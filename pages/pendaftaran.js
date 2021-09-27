import React, { useState } from 'react';
import Container from '@components/FIM23';
import { Skeleton } from 'antd';
import ProfileContextProvider from '@context/profileContext';

const Pendaftaran = (props) => {
  const [loading] = useState(false);

  return loading ? (
    <Skeleton />
  ) : (
    <ProfileContextProvider {...props}>
      <Container {...props} />
    </ProfileContextProvider>
  );
};

export default Pendaftaran;
