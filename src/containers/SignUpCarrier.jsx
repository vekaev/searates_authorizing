import React, { useState } from 'react';
import './Form.scss';
import { NavLink } from 'react-router-dom';
import FooterInfo from '../components/FormComponent/FooterInfo';
import CarrierAccDescription from '../components/CarrierAccDescription';
import { useForm } from 'react-hook-form';
import { countriesData } from '../components/CountriesData';
import axios from 'axios';
import ConfirmMail from '../components/ConfirmMail';
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { TermsAndCondition } from '../components/FormComponent/TermsAndCondition';
import { SubmitBtn } from '../components/FormComponent/SubmitBtn';

const SignUpCarrier = ({ state, clients_info }) => {
  const CountriesList = countriesData.map((country) => {
    return (
      <option
        key={country.code}
        data-tel={country.dial_code}
        value={country.code}
      >
        {country.name}
      </option>
    );
  });

  const countryTelCode = (event) => {
    let code = event.target[event.target.selectedIndex].getAttribute(
      'data-tel',
    );
    if (code !== '') {
      return `+${code} `;
    }

    return '';
  };

  const [token, setToken] = useState('');
  const [loading, setSubmitButtonLoading] = useState(false);
  const [regStatusConfirmMail, setRegStatus] = useState(false);
  const { register, errors, handleSubmit, setError, setValue } = useForm();

  const onSubmit = (data) => {
    let params = new URLSearchParams();
    params.append('carrier', 'true');
    params.append('email', data.email);
    params.append('f_name', data.f_name);
    params.append('l_name', data.l_name);
    params.append('password', data.password);
    params.append('country', data.country);
    params.append('phone', data.phone);
    params.append('address', data.address);
    params.append('city', data.city);
    params.append('company_name', data.company_name);
    params.append('token', data.token);
    setSubmitButtonLoading(true);
    axios.post('/auth/sign-up-back', params).then((res) => {
      if (res.data.status === 'success') {
        setRegStatus(true);
      } else {
        setError([{ name: 'common', message: res.data.message }]);
        setSubmitButtonLoading(false);

        grecaptcha
          .execute('6LeNrPIUAAAAAEHPsc9B0fHGf2yTM5-m38E1h6yq', {
            action: 'auth',
          })
          .then(function (token) {
            setToken(token);
          });
      }
    });
  };

  return regStatusConfirmMail ? (
    <ConfirmMail state={state} clients_info={clients_info} />
  ) : (
    <section className='section-login'>
      <div className='content'>
        <CarrierAccDescription />

        <div className='sign-form'>
          <div className={`sign-form_content`}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='sign-form_content-input-part'
            >
              <legend className='sign-form_content-title'>
                Create <span>Carrier</span> Account
              </legend>
              <div className='sign-form_content-input-part-dual-input'>
                <div
                  className={`input-wrapper ${errors.f_name ? 'error' : ''}`}
                >
                  <input
                    className='input'
                    type='text'
                    name='f_name'
                    autoComplete='first-name'
                    placeholder=' '
                    ref={register({
                      required: true,
                    })}
                  />
                  <span className='placeholder'>First name</span>
                  {errors.f_name && errors.f_name.type === 'required' && (
                    <p className='errorInputMsg'>
                      Please enter your First name
                    </p>
                  )}
                </div>
                <div
                  className={`input-wrapper ${errors.l_name ? 'error' : ''}`}
                >
                  <input
                    className='input'
                    type='text'
                    name='l_name'
                    autoComplete='last-name'
                    placeholder=' '
                    ref={register({
                      required: true,
                    })}
                  />
                  <span className='placeholder'>Last name</span>
                  {errors.l_name && errors.l_name.type === 'required' && (
                    <p className='errorInputMsg'>Please enter your Last name</p>
                  )}
                </div>
              </div>

              <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                <input
                  className='input'
                  type='text'
                  name='email'
                  placeholder=' '
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
              </div>

              <div className='sign-form_content-input-part-dual-input'>
                <div
                  className={`input-wrapper ${errors.country ? 'error' : ''}`}
                >
                  <select
                    defaultValue=''
                    onChange={(event) => {
                      setValue('phone', `${countryTelCode(event)}`);
                    }}
                    name='country'
                    className={'sign-form_content-input-part_input-select'}
                    ref={register({
                      required: true,
                    })}
                  >
                    <option value='' disabled>
                      {' '}
                      Select country
                    </option>
                    {CountriesList}
                  </select>
                  {errors.country && (
                    <p className='errorInputMsg'>Please select a country</p>
                  )}
                </div>

                <div className={`input-wrapper ${errors.city ? 'error' : ''}`}>
                  <input
                    className='input'
                    type='text'
                    name='city'
                    autoComplete='city'
                    placeholder=' '
                    ref={register({
                      required: true,
                    })}
                  />
                  <span className='placeholder'>City</span>
                  {errors.city && (
                    <p className='errorInputMsg'>City is required</p>
                  )}
                </div>
              </div>

              <div className={`input-wrapper ${errors.address ? 'error' : ''}`}>
                <input
                  className='input'
                  type='text'
                  name='address'
                  autoComplete='address'
                  placeholder=' '
                  ref={register({
                    required: true,
                  })}
                />
                <span className='placeholder'>Address</span>
                {errors.address && (
                  <p className='errorInputMsg'>Please enter your Address</p>
                )}
              </div>

              <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                <input
                  className='input'
                  type='tel'
                  name='phone'
                  placeholder=' '
                  ref={register({
                    required: true,
                    minLength: 8,
                    pattern: /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
                  })}
                />
                <span className='placeholder'>Phone</span>
                {errors.phone && (
                  <p className='errorInputMsg'>
                    Please enter the phone number using international dialing
                    format
                  </p>
                )}
              </div>
              <div
                className={`input-wrapper ${
                  errors.company_name ? 'error' : ''
                }`}
              >
                <input
                  className='input'
                  type='text'
                  name='company_name'
                  autoComplete='org'
                  placeholder=' '
                  ref={register({
                    required: true,
                  })}
                />
                <span className='placeholder'>Company name</span>
                {errors.company_name && (
                  <p className='errorInputMsg'>
                    Please enter your Company Name
                  </p>
                )}
              </div>

              <div
                className={`input-wrapper ${errors.password ? 'error' : ''}`}
              >
                <input
                  className='input'
                  type='password'
                  name='password'
                  autoComplete='new-password'
                  placeholder=' '
                  ref={register({
                    required: true,
                    minLength: 8,
                  })}
                />
                <span className='placeholder'>Password</span>
                {errors.password && errors.password.type === 'required' && (
                  <p className='errorInputMsg'>Please specify a password</p>
                )}
                {errors.password && errors.password.type === 'minLength' && (
                  <p className='errorInputMsg'>Minimum 8 characters</p>
                )}

                {errors.common && (
                  <p className='errorInputMsg'>{errors.common.message}</p>
                )}
              </div>

              <GoogleReCaptchaProvider reCaptchaKey='6LeNrPIUAAAAAEHPsc9B0fHGf2yTM5-m38E1h6yq'>
                <GoogleReCaptcha onVerify={(token) => setToken(token)} />
                <input
                  type='hidden'
                  name='token'
                  readOnly
                  value={token}
                  ref={register()}
                />
              </GoogleReCaptchaProvider>

              <SubmitBtn state={state} loading={loading} title={'Join us'} />
            </form>

            <div className='sign-form_content-payment'>
              <span className='sign-form_content-payment-card'></span>
            </div>

            <div className='sign-form_content-reg-part'>
              <p>Already have an account?</p>
              <NavLink to='/sign-in'>Sign in</NavLink>
            </div>

            <TermsAndCondition state={state} />
          </div>
        </div>
      </div>
      <FooterInfo />
    </section>
  );
};

export default SignUpCarrier;
