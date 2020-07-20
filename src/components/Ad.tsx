import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

type Props = {
  className?: string;
  format?: string;
  slot: string;
};

const Ad: FC<Props> = ({ className, format = 'auto', slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className={classNames('adsbygoogle', className)}
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
    />
  );
};

export default Ad;
