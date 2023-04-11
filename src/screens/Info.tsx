import React from 'react';
import {
  Box,
  ScrollView,
  Text,
  useColorModeValue,
  Avatar,
  Center,
} from 'native-base';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

const Info = () => {
  return (
    <Box flex={1} bg={useColorModeValue('warmGray.50', 'primary.900')} w="full">
      <Header title="" image={require('../assets/info.png')}>
        <NavBar navText="Informacje" />
      </Header>
      <Center>
        <ScrollView
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          bg={useColorModeValue('warmGray.50', 'primary.900')}
          mt="-20px"
          pt="30px"
          p={4}>
          <Avatar
            source={require('../assets/ja.jpeg')}
            size="xl"
            borderRadius={100}
            marginLeft={'35%'}
            marginBottom={10}
          />
          <Text>
            Aplikacja została napisana w celu promocji jako portfolio oraz do
            uproszczenia rozliczania się ze wszelkich długów wśród znajomych.
            Jeśli uwazasz, ze narusza ona warunki umów licencyjnych, skontaktuj
            się ze mną pod adresem oskarpianka08@gmail.com
          </Text>
        </ScrollView>
      </Center>
    </Box>
  );
};

export default Info;
