import React from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Helpers/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 32,
          color: '#004d7f',
          fontWeight: '600',
        }}>
        Welcome!
      </Text>
      <TouchableOpacity
        testID="signUp-button"
        onPress={() => navigation.navigate('ClientsScreen')}>
        <Text
          style={{
            color: '#007ACC',
            fontSize: 20,
            fontFamily: 'arial',
            alignSelf: 'center',
          }}>
          See clients list
        </Text>
      </TouchableOpacity>
    </View>
  );
}
