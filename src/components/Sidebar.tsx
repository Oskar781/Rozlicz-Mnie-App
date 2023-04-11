import React, {useCallback} from 'react';
import {
  Box,
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
} from 'native-base';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import ThemeToggle from './ThemeToggle';
import MenuButton from './MenuButton';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const Sidebar = (props: DrawerContentComponentProps) => {
  const {state, navigation} = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Zapłacone');
  }, [navigation]);
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('Do zapłaty');
  }, [navigation]);
  const handlePressMenuComplaints = useCallback(() => {
    navigation.navigate('Reklamacje');
  }, [navigation]);
  const handlePressMenuManageAccount = useCallback(() => {
    navigation.navigate('Ustawienia konta');
  }, [navigation]);
  const handlePressMenuInfo = useCallback(() => {
    navigation.navigate('Info');
  }, [navigation]);
  const handlePressMenuLogout = useCallback(() => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  }, [navigation]);

  return (
    <Box
      safeArea
      flex={1}
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}>
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('darkBlue.500', 'blue.50')}
            _icon={{
              as: Feather,
              name: 'chevron-left',
              size: 6,
              color: useColorModeValue('blue.800', 'blue.50'),
            }}
          />
        </HStack>

        <Heading mb={4} mt={20} size="md">
          RozliczMnie App
        </Heading>
        <MenuButton
          active={currentRoute === 'Zapłacone'}
          onPress={handlePressMenuMain}
          icon="check-circle">
          Zapłacone
        </MenuButton>

        <MenuButton
          active={currentRoute === 'Do zapłaty'}
          onPress={handlePressMenuAbout}
          icon="circle">
          Niezapłacone
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Reklamacje'}
          onPress={handlePressMenuComplaints}
          icon="alert-triangle">
          Reklamacje
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Ustawienia konta'}
          onPress={handlePressMenuManageAccount}
          icon="lock">
          Ustawienia konta
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Info'}
          onPress={handlePressMenuInfo}
          icon="info">
          Informacje
        </MenuButton>
        <MenuButton
          active={currentRoute === 'Wyloguj się'}
          onPress={handlePressMenuLogout}
          icon="log-out">
          Wyloguj się
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </Box>
  );
};

export default Sidebar;
