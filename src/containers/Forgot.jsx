import React, { useState } from 'react';
import './Form.scss';
import { NavLink } from 'react-router-dom';
import AuthImg from '../components/AuthImg';
import FooterInfo from '../components/FormComponent/FooterInfo';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SubmitBtn } from '../components/FormComponent/SubmitBtn';

const Forgot = ({ state, clients_info }) => {
  const [msgResendPsw, setMsgResendPsw] = useState('');
  const [loading, setSubmitButtonLoading] = useState(false);
  const { register, errors, handleSubmit, setError } = useForm();

  const onSubmit = (data) => {
    let params = new URLSearchParams();
    params.append('email', data.email);
    setSubmitButtonLoading(true);
    axios.post('/auth/forgot-password-back', params).then((res) => {
      if (res.data.status === 'success') {
        setMsgResendPsw(res.data.message);
        setSubmitButtonLoading(false);
      } else {
        setError([{ name: 'common', message: res.data.message }]);
        setSubmitButtonLoading(false);
      }
    });
  };

  return (
    <section className='section-login'>
      <div className='content'>
        {clients_info ? '' : <AuthImg state={state} />}

        <div className='sign-form'>
          <div className={`sign-form_content`}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='sign-form_content-input-part'
            >
              <legend className='sign-form_content-title signIn-form_content-title'>
                Forgot your password?
              </legend>

              <div className='sign-form_content-sub-title'>
                <p>
                  Enter your email and we will send you a link to reset your
                  password.
                </p>
              </div>
              <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                <input
                  className='input'
                  type='text'
                  placeholder=' '
                  name='email'
                  autoComplete='off'
                  ref={register({
                    required: true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  })}
                />
                <span className='placeholder'>E-mail</span>
                {errors.email && errors.email.type === 'required' && (
                  <p className='errorInputMsg'>This field is required</p>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <p className='errorInputMsg'>Please provide a valid e-mail</p>
                )}
                {errors.common && (
                  <p className='errorInputMsg'>{errors.common.message}</p>
                )}
              </div>
              {msgResendPsw !== '' ? (
                <p className='resendMail'>{msgResendPsw}</p>
              ) : (
                ''
              )}

              <SubmitBtn
                state={state}
                loading={loading}
                title={'Send reset link'}
              />
            </form>

            <div className='sign-form_content-reg-part'>
              <p>Back to </p>
              <NavLink to='/sign-in'>Sign in</NavLink>
            </div>
          </div>
        </div>
      </div>
      <FooterInfo />
    </section>
  );
};

export default Forgot;
