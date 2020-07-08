import React from 'react';
import './AuthImg.scss';

const AuthImg = ({ state }) => {
  return (
    <div className='sign-img'>
      <img
        alt='man registers by tablet'
        src={`https://www.searates.com/design/images/apps/login/login_img${
          state !== undefined ? `_${state}` : ''
        }.svg`}
      ></img>
    </div>
  );
};

export default AuthImg;
