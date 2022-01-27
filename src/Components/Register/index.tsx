import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import {useForm, Controller} from 'react-hook-form';
import {Credentials} from '../../Helpers/types';
import {RootStackParamList} from '../../Helpers/types';
import styles from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function Register({route, navigation}: Props) {
  const handleRegister = async (newUser: Credentials) => {
    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = users && JSON.parse(users);
      if (
        Array.isArray(parsedUsers) &&
        !parsedUsers.filter((user: Credentials) => user.user === newUser.user)
          .length
      ) {
        parsedUsers.push(newUser);
        return AsyncStorage.setItem('users', JSON.stringify(parsedUsers)).then(
          () => navigation.navigate('SignIn'),
        );
      }
      Toast.show('User registered');
      AsyncStorage.setItem('users', JSON.stringify([newUser]));
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const onSubmit = (data: Credentials) => {
    handleRegister(data);
  };
  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'User is required.'},
            pattern: {
              value: /^[A-Z]+$/i,
              message: 'No special characters allowed',
            },
            minLength: {
              value: 4,
              message: 'At least 4 characters are required',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.textInputsContainer}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                style={styles.textInput}
                value={value}
                placeholder="Username"
                autoCapitalize="none"
              />
            </View>
          )}
          name="user"
        />
        {errors.user && (
          <Text style={styles.errorMsg}>{errors.user.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Password is required.'},
            minLength: {
              value: 6,
              message: 'At least 6 characters are required',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.textInputsContainer}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                style={styles.textInput}
                value={value}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorMsg}>{errors.password.message}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Button title="Sign in" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  );
}
