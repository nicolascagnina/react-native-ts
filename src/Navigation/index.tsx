import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Clients from '../Components/Clients';
import ClientForm from '../Components/Clients/ClientForm';
import Login from '../Components/Login';
import Register from '../Components/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return isSignedIn ? (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({}) => ({
            headerTitle: '',
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Clients" component={Clients} />
          <Tab.Screen name="ClientForm" component={ClientForm} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={Login}
            initialParams={{setIsSignedIn: setIsSignedIn}}
          />
          <Stack.Screen name="SignUp" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
