import React from 'react';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MainStack from './Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <FlipperAsyncStorage />
      <MainStack />
    </SafeAreaProvider>
  );
}
