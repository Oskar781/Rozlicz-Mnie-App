import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Box, Center, Text, useColorModeValue} from 'native-base';
import Header from '../components/Header';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface DataItem {
  password: string;
  'password-repeat': string;
}

const ChangePassword = ({navigation: {goBack}}: any) => {
  const [errorMessage, setErrorMessage] = useState('');

  const showAlert = () =>
    Alert.alert(
      'Zmiana hasła ',
      'Zmiana hasła powiodła się 🎉, teraz mozesz logować się z wykorzystaniem nowego hasła 🔒',
      [
        {
          text: 'OK 👌',
        },
      ],
    );

  const {control, handleSubmit, watch, resetField} = useForm();
  const pwd = watch('password');

  const onUpdatePressed = async (data: DataItem) => {
    const {password} = data;
    console.log(data);
    auth()
      .currentUser?.updatePassword(password)
      .then(() => {
        showAlert();
      })
      .then(() => {
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
    resetField('password');
    resetField('password-repeat');
  };

  const onIWouldRatherNotChangeThePassword = () => {
    goBack();
    resetField('password');
    resetField('password-repeat');
  };

  return (
    <Box flex={1} bg={useColorModeValue('warmGray.50', 'primary.900')} w="full">
      <TouchableOpacity style={styles.addBtn} onPress={() => goBack()}>
        <AntDesign name="leftcircleo" color="#3b71f3" size={40} />
      </TouchableOpacity>
      <Header title="" image={require('../assets/security.png')}>
        {null}
      </Header>

      <Center>
        <Text>{errorMessage}</Text>
        <View style={styles.container}>
          <CustomInput
            name="password"
            control={control}
            placeholder="Hasło"
            secureTextEntry
            rules={{
              required: 'Wprowadź hasło',
              minLength: {
                value: 6,
                message: 'Hasło powinno mieć co najmniej 6 znaków',
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Potwierdź hasło"
            secureTextEntry
            rules={{
              validate: (value: string) =>
                value === pwd || 'Wprowadzone hasła nie są takie same',
            }}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmit(onUpdatePressed)}>
            <Text style={styles.btnText}>Zaktualizuj hasło</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={onIWouldRatherNotChangeThePassword}>
            <Text style={styles.btnText}>Jednak wolę nie zmieniać hasła</Text>
          </TouchableOpacity>
        </View>
      </Center>
    </Box>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  btn: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#4285F4',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
  },
  container: {
    width: '80%',
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    marginTop: 30,
    marginLeft: 12,
  },
});
