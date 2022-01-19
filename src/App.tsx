/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
// import Clients from './Components/ClientsList';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Register from './Components/Register';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

const App = () => {
  const backgroundStyle = {
    backgroundColor: 'white',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <FlipperAsyncStorage />
      <StatusBar />
      {/* <Clients /> */}
      <Register />
    </SafeAreaView>
  );
};

export default App;
