import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackNavigator, ClientStackNavigator} from './MainNavigator';
import Login from '../Components/Login';
import Register from '../Components/Register';
import {Button, TouchableOpacity, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return isSignedIn ? (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'HomeScreen') {
                return <AntDesign name={'home'} size={size} color={color} />;
              } else if (route.name === 'ClientsScreen') {
                return <AntDesign name={'profile'} size={size} color={color} />;
              }
            },
            headerTitle: '',
          })}>
          <Tab.Screen
            name="HomeScreen"
            component={MainStackNavigator}
            options={{
              title: 'Home',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => setIsSignedIn(false)}
                  style={{paddingRight: 40}}>
                  <View style={{alignItems: 'center'}}>
                    <Ionicons name="exit-outline" size={20} />
                    <Text>Logout</Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="ClientsScreen"
            component={ClientStackNavigator}
            options={{
              title: 'Clients',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => setIsSignedIn(false)}
                  style={{paddingRight: 40}}>
                  <View style={{alignItems: 'center'}}>
                    <Ionicons name="exit-outline" size={20} />
                    <Text>Logout</Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
          />
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
