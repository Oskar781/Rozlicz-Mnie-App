import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import theme from '../theme';

type Props = {
  children: React.ReactNode;
};

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const AppContainer = (props: Props) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider config={config} theme={theme}>
        {props.children}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppContainer;
