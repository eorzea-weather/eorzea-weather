import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const Ad = ({ format, slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
    />
  );
};

Ad.propTypes = {
  format: PropTypes.string,
  slot: PropTypes.string.isRequired,
};

Ad.defaultProps = {
  format: 'auto',
};

export default Ad;
