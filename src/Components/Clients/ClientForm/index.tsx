import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import {useForm, Controller} from 'react-hook-form';
import {Client} from '../../../Helpers/types';
import {RootStackParamList} from '../../../Helpers/types';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientContext} from '../../../Context/ClientsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

export default function ClientForm({route, navigation}: Props) {
  const [id, setId] = useState<number>(-1);
  const isFocused = useIsFocused();
  const clientContext = useContext(ClientContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Client>();

  useEffect(() => {
    if (!isFocused) {
      reset({name: undefined, email: undefined});
      navigation.setParams({client: undefined});
    }
  }, [isFocused]);

  useEffect(() => {
    reset({
      name: route.params?.client?.name,
      email: route.params?.client?.email,
    }),
      setId(route.params?.client?.id ?? -1);
  }, [reset, route.params?.client]);

  const onSubmit = (data: Client) => {
    route.params?.client
      ? clientContext?.updateClient({...data, id})
      : clientContext?.addClient(data);
    navigation.navigate('ClientsScreen');
  };
  return (
    <View style={styles.formContainer}>
      <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={150}>
        <Text style={styles.title}>Information:</Text>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Name is required.'},
            pattern: {
              value: /^[A-Z]+$/i,
              message: 'No special characters allowed',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.textInputsContainer}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                style={styles.textInput}
                value={value}
                placeholder="Name"
              />
            </View>
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorMsg}>{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Email is required.'},
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={styles.textInputsContainer}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                style={styles.textInput}
                value={value}
                placeholder="Email"
              />
            </View>
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorMsg}>{errors.email.message}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {route.params?.client ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
