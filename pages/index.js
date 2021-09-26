import React, { useEffect, useState } from 'react';
import { newAuth } from '@HoC/withNewAut23';
import PropTypes from 'prop-types';

import FIM23 from './fim23';

const Index = (props) => {
  const { cookieLogin } = props;
  const [, setToken] = useState('');

  const fetchToken = async () => {
    const checkSession = await newAuth(cookieLogin);
    setToken(checkSession.token_FIM);
  };

  useEffect(() => {
    fetchToken();
    // setLoading(false);
  }, []);

  return <FIM23 {...props} />;
};

Index.propTypes = {
  cookieLogin: PropTypes,
};

export default Index;
