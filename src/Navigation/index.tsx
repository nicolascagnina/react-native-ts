import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Components/Auth/Login';
import Clients from '../Components/Clients';
import ClientForm from '../Components/Clients/ClientForm';
import Register from '../Components/Auth/Register';
import {TouchableOpacity, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../Components/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [firstScan, setFirstScan] = useState(true);

  useEffect(() => {
    setFirstScan(false);
    const asyncFunction = async () => {
      try {
        const isSignedAsyncStorage = await AsyncStorage.getItem('isSigned');
        isSignedAsyncStorage === 'true'
          ? setIsSignedIn(true)
          : setIsSignedIn(false);
      } catch (error) {
        console.log(error);
      }
    };
    asyncFunction();
  }, []);

  useEffect(() => {
    if (!firstScan) AsyncStorage.setItem('isSigned', isSignedIn.toString());
  }, [isSignedIn]);

  return isSignedIn ? (
    <>
      <NavigationContainer>
        <Tab.Navigator
          backBehavior="history"
          screenOptions={({route, navigation}) => ({
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
            component={HomeScreen}
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
            name="ClientForm"
            component={ClientForm}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack(null)}
                  style={{paddingRight: 40}}>
                  <View style={{alignItems: 'center', paddingLeft: 40}}>
                    <AntDesign name="back" size={20} />
                    <Text>Go back</Text>
                  </View>
                </TouchableOpacity>
              ),
              title: 'Clients',
              tabBarButton: () => null,
            })}
          />
          <Tab.Screen
            name="ClientsScreen"
            component={Clients}
            options={{
              title: 'Clients',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={Login}
            initialParams={{setIsSignedIn: setIsSignedIn}}
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity
                  testID="signUp-button"
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      color: '#007ACC',
                      fontSize: 20,
                      fontFamily: 'arial',
                      alignSelf: 'center',
                    }}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="SignUp" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
