import React from 'react';
import styles from './TermsAndCondition.module.scss';
export const TermsAndCondition = ({ state }) => {
  console.log(state);
  return (
    <div
      className={`${styles['agree-terms']} ${styles[`${state}-agree-terms`]}`}
    >
      <p>
        By signing in or creating an account, you agree with our{' '}
        <a target='_blank' href='/tos'>
          Terms & conditions
        </a>
      </p>
    </div>
  );
};
