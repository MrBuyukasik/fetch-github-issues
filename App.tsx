/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Routers from './src/routes/Routers';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routers />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
