import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/container/App';
import {name as appName} from './app.json';
import store from './src/store/index';
import {Provider} from 'react-redux';

const AppRedux = () => (
  <Provider {...{store}}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
