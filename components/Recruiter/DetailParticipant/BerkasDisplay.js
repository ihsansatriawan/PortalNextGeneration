import React from 'react';
import { string } from 'prop-types';

const get_url_extension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim();
};

const BerkasDisplay = ({ url }) => {
  const extension = get_url_extension(url);

  switch (extension) {
    case 'jpg':
    case 'png':
      return <img src={url} alt='image' />;
    case 'pdf': {
      return (
        <object data={url} type='application/pdf'>
          <embed src={url} type='application/pdf' />
        </object>
      );
    }
    default:
      return <h1>-</h1>;
  }
};

BerkasDisplay.propTypes = {
  url: string,
};

export default BerkasDisplay;
