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
      return <img src={url} alt='image' width='100%' />;
    case 'pdf': {
      return (
        // <object
        //   data={url}
        //   type='application/pdf'
        //   style={{ width: '100%', height: '250px' }}
        // >
        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
          width='100%'
          type='application/pdf'
          frameBorder='0'
          scrolling='auto'
          height='1100'
        />
        // </object>
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
