import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import AuthImg from '../components/AuthImg';
import FooterInfo from '../components/FormComponent/FooterInfo';
import { useForm } from 'react-hook-form';
import { TermsAndCondition } from '../components/FormComponent/TermsAndCondition';
import './Form.scss';
import { SubmitBtn } from '../components/FormComponent/SubmitBtn';

const SignIn = ({ state, clients_info }) => {
  const [msgResendMail, setMsgResendMail] = useState('');
  const [resendMail, setActivationMailStatus] = useState('');
  const [loading, setSubmitButtonLoading] = useState(false);
  const { register, errors, handleSubmit, setError } = useForm();

  const onSubmit = (data) => {
    let params = new URLSearchParams();
    params.append('login', data.login);
    params.append('password', data.password);

    setSubmitButtonLoading(true);
    axios
      .post('/auth/sign-in-back', params, { withCredentials: true })
      .then((res) => {
        if (res.data.status === 'success') {
          if (clients_info) {
            // popup login
            window.location.href =
              clients_info.redirect_uri +
              '?token=' +
              encodeURIComponent(res.data.token);
          } else {
            window.location.href = httpReferer;
          }
        } else if (res.data.status === 'activation') {
          setError([{ name: 'resend_mail', message: res.data.message }]);
          setMsgResendMail(res.data.message);
          setActivationMailStatus('informed');
          setSubmitButtonLoading(false);
        } else {
          setError([{ name: 'common', message: res.data.message }]);
          setSubmitButtonLoading(false);
        }
      });
  };

  const onMailSubmit = (data) => {
    let params = new URLSearchParams();
    params.append('login', data.login);
    setSubmitButtonLoading(true);
    axios.post('/auth/resend-activation', params).then((res) => {
      setError([{ name: 'resend_mail', message: res.data.message }]);
      setSubmitButtonLoading(false);
      setMsgResendMail(res.data.message);
      setActivationMailStatus('success');
    });
  };

  return (
    <section className='section-login'>
      <div className='content'>
        {clients_info ? '' : <AuthImg state={state} />}

        <div className='sign-form'>
          <div className='sign-form_content'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='sign-form_content-input-part'
            >
              <legend className='sign-form_content-title'>Sign in</legend>
              <div className={`input-wrapper ${errors.login ? 'error' : ''}`}>
                <input
                  className='input'
                  type='text'
                  placeholder=' '
                  name='login'
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                  spellCheck='false'
                  autoFocus={true}
                  ref={register({
                    required: true,
                  })}
                />
                <span className='placeholder'>Login or E-mail</span>
                {errors.login && errors.login.type === 'required' && (
                  <p className='errorInputMsg'>E-mail is required</p>
                )}
              </div>
              <div
                className={`input-wrapper ${errors.password ? 'error' : ''}`}
              >
                <input
                  className='input'
                  type='password'
                  name='password'
                  autoComplete='off'
                  placeholder=' '
                  ref={register({
                    required: true,
                  })}
                />
                <span className='placeholder'>Password</span>
                {errors.password && errors.password.type === 'required' && (
                  <p className='errorInputMsg'>Please specify a password</p>
                )}
                {errors.common && (
                  <p className='errorInputMsg'>{errors.common.message}</p>
                )}

                {resendMail == 'informed' && (
                  <p className='resendMail'>
                    Your account has not been activated yet.
                    <span
                      onClick={handleSubmit(onMailSubmit)}
                      className={`resendMailLink ${
                        loading ? 'loading-main-btn' : ''
                      }`}
                    >
                      Resend email
                    </span>
                  </p>
                )}
                {resendMail == 'success' && (
                  <p className='resendMail'>{msgResendMail}</p>
                )}
              </div>

              <SubmitBtn state={state} loading={loading} title={'Sign in'} />
            </form>

            <div className='sign-form_content-reg-part'>
              <p>Don't have a SeaRates account yet?</p>
              <NavLink to='/sign-up'>Sign Up</NavLink>
            </div>

            <div className='sign-form_content-addtnl-sign '>
              <p className='sign-form_content-addtnl-sign_title '>
                Or sign in with
              </p>
              <div className='sign-form_content-addtnl-sign_social-net '>
                <a
                  className='sign-form_content-addtnl-sign_social-net-btn'
                  onClick={() =>
                    window.open(urlGoogle, 'Auth Popup', 'width=430,height=620')
                  }
                >
                  <div className='sign-form_content-addtnl-sign_social-net-btn-icon-part '>
                    <img
                      src='https://www.searates.com/design/images/apps/login/icon_google.png'
                      alt='google logo icon'
                    />
                  </div>
                  <div className='sign-form_content-addtnl-sign_social-net-btn-text-part '>
                    <p>Google</p>
                  </div>
                </a>
                <a
                  className='sign-form_content-addtnl-sign_social-net-btn'
                  onClick={() =>
                    window.open(
                      urlFacebook,
                      'Auth Popup',
                      'width=430,height=620',
                    )
                  }
                >
                  <div className='sign-form_content-addtnl-sign_social-net-btn-icon-part '>
                    <img
                      src='https://www.searates.com/design/images/apps/login/icon_facebook.png'
                      alt='facebook logo icon'
                    />
                  </div>
                  <div className='sign-form_content-addtnl-sign_social-net-btn-text-part '>
                    <p>Facebook</p>
                  </div>
                </a>
              </div>
            </div>

            <div className='sign-form_content-frgt-psw'>
              <NavLink
                to='/forgot-password'
                className='sign-form_content-addtnl-opt_forgot-psw'
              >
                Forgot Password?
              </NavLink>
            </div>

            <TermsAndCondition state={state} />
          </div>
        </div>
      </div>

      <FooterInfo />
    </section>
  );
};

export default SignIn;
