/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import MyBlur from '../components/MyBlur';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const ResetPassword = ({navigation}: any): JSX.Element => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showAlert = () =>
    Alert.alert(
      'Resetowanie hasła',
      'Resetowanie hasła powiodło się, sprawdź swoją skrzynkę pocztową i kliknij w link zawarty w wiadomości aby dokończyć resetowanie hasła 🔒',
      [
        {
          text: 'OK',
        },
      ],
    );

  const resetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => showAlert())
      .then(() => {
        navigation.navigate('Start Screen');
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const {height} = Dimensions.get('window');

  return (
    <>
      <MyBlur />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/parts.jpg')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '80%',
            height: (height / 3) * 1.4,
            borderRadius: 16,
            marginBottom: 40,
            marginTop: 20,
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Zresetuj hasło 🔑</Text>
          <Text style={styles.titleMessage}>{errorMessage}</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonsText}>Jednak pamiętam</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetPassword} style={styles.button2}>
              <Text style={styles.buttonsText}>Zresetuj hasło</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    margin: 2,
    borderColor: 'black',
    paddingHorizontal: 40,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 35,
    textAlign: 'center',
    color: '#353147',
  },
  titleMessage: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 35,
    textAlign: 'center',
    color: 'red',
  },
  body: {
    paddingTop: 20,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400',
    textAlign: 'center',
    color: '#353147',
  },
  buttonsText: {
    fontWeight: '500',
    color: '#353147',
  },
  textInput: {
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    margin: 4,
    padding: 16,
    borderRadius: 6,
  },
  button1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    padding: 16,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  button2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomRightRadius: 6,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 6,
    backgroundColor: '#DFE3E630',
    marginTop: 40,
  },
});

export default ResetPassword;
