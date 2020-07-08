import React from 'react';
import styles from './SubmitBtn.module.scss';
export const SubmitBtn = ({ state, loading, title }) => {
  return (
    <button
      type='submit'
      className={`${styles['submit-btn']}
                  ${styles[`${loading && 'loading_submit-btn'}`]}
                  ${styles[`${state}_submit-btn`]}
                  `}
    >
      {loading ? <span className={styles['spinner']}>Please wait</span> : title}
    </button>
  );
};
