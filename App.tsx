/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import AppContainer from './src/components/AppContainer';
import ToPay from './src/screens/ToPay';
import AlreadyPaid from './src/screens/AlreadyPaid';
import Complaints from './src/screens/Complaints';
import ManageAccount from './src/screens/ManageAccount';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemDetails from './src/screens/ItemDetails';
import StartScreen from './src/screens/StartScreen';
import Info from './src/screens/Info';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Sidebar from './src/components/Sidebar';
import ComplaintDetails from './src/screens/ComplaintDetails';
import SplashScreen from 'react-native-splash-screen';
import ResetPassword from './src/screens/ResetPassword';
import ChangePassword from './src/screens/ChangePassword';
import AddComplaint from './src/screens/AddComplaint';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Do Zapłaty"
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}>
      <Drawer.Screen name="Do zapłaty" component={ToPay} />
      <Drawer.Screen name="Zapłacone" component={AlreadyPaid} />
      <Drawer.Screen name="Reklamacje" component={Complaints} />
      <Drawer.Screen name="Ustawienia konta" component={ManageAccount} />
      <Drawer.Screen name="Info" component={Info} />
    </Drawer.Navigator>
  );
};

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start Screen"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ItemDetails"
          component={ItemDetails}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ComplaintDetails"
          component={ComplaintDetails}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddComplaint"
          component={AddComplaint}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </AppContainer>
  );
}

export default App;
