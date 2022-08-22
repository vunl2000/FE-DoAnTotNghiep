import React from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/container/App';
import {name as appName} from './app.json';
import store, {persistor} from './src/store/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
const AppRedux = () => (
  <Provider {...{store}}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
