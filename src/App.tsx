import React from 'react';
import ClientContextProvider from './Context/ClientsContext';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStack from './Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ClientContextProvider>
        <FlipperAsyncStorage />
        <MainStack />
      </ClientContextProvider>
    </SafeAreaProvider>
  );
}
