import React from 'react';
import './CarrierAccDescription.scss';

class CarrierAccDescription extends React.Component {
  render() {
    return (
      <>
        <section className='section-cerrier-descrp'>
          <h3 className='section-cerrier-descrp-title'>
            Become a member of the DF Alliance <span>$299 per month</span>
          </h3>
          <p>
            SeaRates along with DP World launched the Digital Freight Alliance
            (DFA), the first of its kind forwarder community to boost sales of
            logistics services and to bridge connections that will drive growth
            for all who participate in the alliance.
          </p>
          <p>
            By registering into SeaRates you automatically become a member of
            the DF Alliance
          </p>
          <p>
            Pay $3,588 per year for membership of DF Alliance and get many
            benefits with us.
          </p>
          <b>
            Follow the link{' '}
            <a target='_blank' href='https://www.df-alliance.com/'>
              DF Alliance
            </a>
          </b>
        </section>
      </>
    );
  }
}

export default CarrierAccDescription;
