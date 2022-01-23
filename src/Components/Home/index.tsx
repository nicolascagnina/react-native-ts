import React from 'react';
import {Text, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{textAlign: 'center'}}>Home</Text>
    </View>
  );
}
