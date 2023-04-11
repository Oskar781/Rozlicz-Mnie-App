import React from 'react';
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
import auth from '@react-native-firebase/auth';

const StartScreen = ({navigation}: any) => {
  const showApp = () => {
    navigation.navigate('Home');
  };

  const showStartScreen = () => {
    return (
      <>
        <MyBlur />
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../assets/parts.jpg')}
            style={{
              width: '85%',
              height: (height / 3) * 1.4,
              borderRadius: 16,
              marginBottom: 40,
              marginTop: 20,
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Hej, miło znowu</Text>
            <Text style={styles.title}>Cię widzieć 👀 </Text>
            <Text style={styles.body}>
              Zaloguj lub zarejestruj się, aby mieć kontrolę nad kupowanym
              towarem oraz reklamacjami.
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.buttonsText}>Zarejestruj się</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button2}>
                <Text style={styles.buttonsText}>Zaloguj się</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const {height} = Dimensions.get('window');
  return <>{auth().currentUser ? showApp() : showStartScreen()}</>;
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
