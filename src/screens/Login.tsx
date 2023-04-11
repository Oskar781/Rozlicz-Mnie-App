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
} from 'react-native';
import MyBlur from '../components/MyBlur';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

function Login({navigation}: any): JSX.Element {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {height} = Dimensions.get('window');

  const login = () => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(userCredential => {
          navigation.navigate('Home', {user: userCredential.user});
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Wprowadź email i hasło');
    }
  };

  return (
    <>
      <MyBlur />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/parts.jpg')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '80%',
            height: (height / 4) * 1.4,
            borderRadius: 16,
            marginBottom: 40,
            marginTop: 20,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Zaloguj się 🤝</Text>
          <Text style={styles.titleMessage}>{errorMessage}</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Hasło"
            style={styles.textInput}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}
              style={styles.button1}>
              <Text style={styles.buttonsText}>Zapomniałem hasła 🙈</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.buttonsText}>Nie mam konta 😭</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => login()} style={styles.button2}>
              <Text style={styles.buttonsText}>Zaloguj się ✅</Text>
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

export default Login;
