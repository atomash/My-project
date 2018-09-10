import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import './styles/GlobalStyles.scss';

const MOUNT = document.getElementById('root');
let initialState;
    
if (typeof window !== 'undefined' && window.INITIAL_STATE) {
    initialState = window.INITIAL_STATE;
    delete window.INITIAL_STATE;
}
const store = configureStore(initialState);

const renderApp = Container => {
    return Loadable.preloadReady().then(() => {
        hydrate(<Container store={store} />, MOUNT)
    });
}

renderApp(Root);

if (process.env.NODE_ENV === 'development'){
    if (module.hot) {
        module.hot.accept('./containers/Root', () => {
          const NextApp = require('./containers/Root').default
          hydrate(<NextApp store={store} />, MOUNT)
        })
      }
}


