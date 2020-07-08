import React from 'react';
import '../containers/Form.scss';
import FooterInfo from './FormComponent/FooterInfo';
import './ConfirmMail.scss';
import AuthImg from '../components/AuthImg';

const ConfirmMail = ({ state, clients_info }) => {
  return (
    <section className='section__confirm-mail'>
      <div className='content'>
        <div className='img-part'>
          <img
            src={`https://www.searates.com/design/images/apps/login/confirm_mail${
              state !== undefined ? `_${state}` : ''
            }.svg`}
            alt='tablet in hands'
          />
        </div>
        <div className='text-part'>
          <h1 className='title'>Confirm your email</h1>
          <p className='subtitle'>
            A confirmation email has been sent to you with a link to activate
            your account.
          </p>
        </div>
        <div className='btn-part'>
          <a
            href={clients_info ? `${clients_info.domain}` : '/'}
            className='btn-part_btn btn-full'
          >
            Back to site
          </a>
        </div>
      </div>
      <FooterInfo />
    </section>
  );
};

export default ConfirmMail;
