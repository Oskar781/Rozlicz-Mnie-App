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
} from 'react-native';
import MyBlur from '../components/MyBlur';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function SignUp({navigation}: any): JSX.Element {
  const [errorMessage, setErrorMessage] = useState('');

  const {height} = Dimensions.get('window');

  const {control, handleSubmit, watch, resetField} = useForm();
  const pwd = watch('password');

  const onRegisterPressed = async data => {
    const {password, email} = data;
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(userCredential => {
        auth().currentUser?.sendEmailVerification();
        navigation.navigate('Home', {user: userCredential});
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
    resetField('email');
    resetField('password');
    resetField('password-repeat');
  };

  const onIHaveAccountPressed = () => {
    navigation.navigate('Login');
    resetField('email');
    resetField('password');
    resetField('password-repeat');
  };

  return (
    <>
      <MyBlur />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/parts.jpg')}
          style={{
            width: '70%',
            height: (height / 4) * 1.5,
            borderRadius: 16,
            marginBottom: 40,
            marginTop: 10,
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Zarejestruj się 🚀</Text>
          <Text style={styles.titleMessage}>{errorMessage}</Text>
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Wprowadź adres email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Wprowadzony email jest niepoprawny',
              },
            }}
          />
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
              validate: value =>
                value === pwd || 'Wprowadzone hasła nie są takie same',
            }}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button1}
              onPress={handleSubmit(onRegisterPressed)}>
              <Text style={styles.buttonsText}>Zarejestruj się</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onIHaveAccountPressed}
              style={styles.button2}>
              <Text style={styles.buttonsText}>Jednak mam konto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

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
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
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
  root: {
    alignItems: 'center',
    padding: 20,
  },

  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUp;
