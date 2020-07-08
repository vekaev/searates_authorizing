import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// connecting main components
import App from './App';

document.addEventListener('DOMContentLoaded', function () {
  const query = location.search;

  ReactDOM.render(
    <BrowserRouter basename='/auth'>
      <App query={query} />
    </BrowserRouter>,
    document.getElementById('authApps'),
  );
});
