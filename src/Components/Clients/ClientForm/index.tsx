import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {useForm, Controller} from 'react-hook-form';
import {Client} from '../../../Helpers/types';
import {RootStackParamList} from '../../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import {ClientContext} from '../../../Context/ClientsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

export default function ClientForm({route, navigation}: Props) {
  const [id, setId] = useState<number>(-1);
  // const [client, setClient] = useState<Client>();
  const clientContext = useContext(ClientContext);
  const {
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();
  const isFocused = useIsFocused();

  useEffect(() => {
    reset({name: route.params?.client.name, email: route.params?.client.email});
    setId(route.params?.client.id ?? -1);
  }, [reset, route.params?.client, route.params?.client.id]);

  const onSubmit = (data: Client) => {
    route.params?.client
      ? clientContext?.updateClient({...data, id})
      : clientContext?.addClient(data);
    navigation.navigate('Clients');
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Information:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
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
      <Controller
        control={control}
        rules={{
          required: true,
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>
          {route.params?.client ? 'Update' : 'Create'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
