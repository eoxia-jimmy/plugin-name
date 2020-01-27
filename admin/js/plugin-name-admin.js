/* global window, document */
if (! window._babelPolyfill) {
  require('@babel/polyfill');
}

import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './containers/app.jsx';

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('react-wrap') != null) {
    ReactDOM.render(<Admin wpObject={window.wpr_object} />, document.getElementById('react-wrap'));
  }
});
