import React, { useState, useEffect } from 'react';

import './App.scss';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import SignIn from './containers/SignIn';
import Forgot from './containers/Forgot';
import SignUpCarrier from './containers/SignUpCarrier';
import SignUp from './containers/SignUp';

let pageLink = 'searates';

const changeStyle = () => {
  const domain = window.location.href;
  if (domain.includes('client=3')) {
    pageLink = 'airrates';
  } else if (domain.includes('client=2')) {
    pageLink = 'landrates';
  } else {
    pageLink = 'landrates';
  }
};
changeStyle();

const App = ({ query }) => {
  const history = useHistory();

  useEffect(() => {
    history.push({
      search: query,
    });

    return history.listen((location) => {
      if (location.search !== query) {
        history.push({
          search: query,
        });
      }
    });
  }, []);

  // let clients_info = window.clients !== '' ? JSON.parse(window.clients) : null;
  let clients_info;
  console.log(pageLink, history);
  return (
    <div
      className={`main-wrp ${pageLink} ${clients_info ? 'client-form' : ''}`}
    >
      <Switch>
        <Route
          path='/sign-in'
          component={() => (
            <SignIn state={pageLink} clients_info={clients_info} />
          )}
        />
        <Route
          path='/sign-up'
          component={() => (
            <SignUp state={pageLink} clients_info={clients_info} />
          )}
        />
        <Route
          path='/sign-up-carrier'
          component={() => (
            <SignUpCarrier state={pageLink} clients_info={clients_info} />
          )}
        />
        <Route
          path='/forgot-password'
          component={() => (
            <Forgot state={pageLink} clients_info={clients_info} />
          )}
        />
        <Redirect to='/sign-in' from='/' />
      </Switch>
    </div>
  );
};

export default App;
