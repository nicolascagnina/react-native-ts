import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Components/Home';
import Clients from '../Components/Clients';
import ClientForm from '../Components/Clients/ClientForm';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false,
  headerTitle: '',
  contentStyle: {
    backgroundColor: 'white',
  },
};

export function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export function ClientStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen
        name="ClientForm"
        component={ClientForm}
        options={{
          headerShown: true,
          headerTitle: '',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}
      />
    </Stack.Navigator>
  );
}
