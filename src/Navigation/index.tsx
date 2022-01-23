import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackNavigator, ClientStackNavigator} from './MainNavigator';
import Login from '../Components/Login';
import Register from '../Components/Register';
import {Button} from 'react-native';

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
          })}>
          <Tab.Screen name="Home" component={MainStackNavigator} />
          <Tab.Screen name="Clients" component={ClientStackNavigator} />
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
            options={({navigation}) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('SignUp')}
                  title="Sign Up"
                  color="#017ACC"
                />
              ),
            })}
          />
          <Stack.Screen name="SignUp" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
