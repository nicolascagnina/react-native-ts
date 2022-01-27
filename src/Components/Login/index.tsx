import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {Credentials} from '../../Helpers/types';
import {RootStackParamList} from '../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import styles from './style';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default function Login({route, navigation}: Props) {
  const handleLogin = async (credentials: Credentials) => {
    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = JSON.parse(users ?? '');
      if (
        Array.isArray(parsedUsers) &&
        parsedUsers.filter(
          (user: Credentials) =>
            user.user === credentials.user &&
            user.password === credentials.password,
        ).length
      ) {
        route.params?.setIsSignedIn(true);
      } else {
        Toast.show('Invalid credentials.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      user: '',
      password: '',
    },
  });

  const onSubmit = (data: Credentials) => {
    handleLogin(data);
  };

  return (
    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-60}>
      <View style={styles.screenContainer}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Log in</Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'User is required.'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.textInputsContainer}>
                <TextInput
                  testID="user-input"
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
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.textInputsContainer}>
                <TextInput
                  testID="password-input"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.textInput}
                  value={value}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorMsg}>{errors.password.message}</Text>
          )}
          <TouchableOpacity
            testID="submit-button"
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Button
            title="Sign up"
            testID="signUp-button"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
