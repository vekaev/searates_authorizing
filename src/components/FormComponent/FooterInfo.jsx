import React from 'react';
import './FooterInfo.scss';

const FooterInfo = () => {
  return (
    <nav className='bottom-links'>
      <a href='/contact' target='_blank'>
        Contact us & Feedback
      </a>
      <a href='/contact/shippers-help ' target='_blank'>
        Help
      </a>
      <a href='/privacy' target='_blank'>
        Privacy
      </a>
    </nav>
  );
};

export default FooterInfo;
