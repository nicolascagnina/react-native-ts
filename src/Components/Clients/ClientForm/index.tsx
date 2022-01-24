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
  const [client, setClient] = useState<Client>();
  const clientContext = useContext(ClientContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    setClient(route.params?.client ?? undefined);
    const test = !!route.params?.client;
    console.log(test);
  }, [isFocused]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: client?.name ?? '',
      email: client?.email ?? '',
    },
  });
  const onSubmit = (data: Client) => {
    clientContext?.addClient(data);
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
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}
