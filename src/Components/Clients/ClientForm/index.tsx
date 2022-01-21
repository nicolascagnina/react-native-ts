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
import {useForm, Controller} from 'react-hook-form';
import {Client} from '../../../Helpers/types';
import {RootStackParamList} from '../../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientForm'>;

export default function ClientForm({route, navigation}: Props) {
  // const {getValues} = useForm();

  const createClient = async (client: Client) => {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients = (clients && JSON.parse(clients)) ?? [];
    try {
      const newClient = {
        id: (clients && +parsedClients?.length + 1) ?? 1,
        name: client.name,
        email: client.email,
      };
      parsedClients.push(newClient);
      await AsyncStorage.setItem('clients', JSON.stringify(parsedClients));
    } catch (error) {
      console.log(error);
    }
  };

  // const updateClient = async (client: Client) => {
  //   try {
  //     const clients = await AsyncStorage.getItem('clients');
  //     const parsedClients = clients && JSON.parse(clients);
  //     if (Array.isArray(parsedClients)) {
  //       parsedClients.forEach((el, index) => {
  //         if (el.id === client.id) {
  //           parsedClients[index] = client;
  //         }
  //       });
  //       return AsyncStorage.setItem('clients', JSON.stringify(parsedClients));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: route.params?.client.name || '',
      email: route.params?.client.email || '',
    },
  });
  const onSubmit = (data: Client) => {
    createClient(data);
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

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 30,
    paddingVertical: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#007ACC',
    fontSize: 35,
    width: 200,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 90,
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#007ACC',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  textInputsContainer: {
    paddingBottom: 5,
    borderBottomWidth: 0.4,
  },
  textInput: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    margin: 5,
  },
});
