import React, {useCallback} from 'react';
import {HStack, IconButton, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface Props {
  navText: string;
}

const NavBar = ({navText}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <HStack w="full" h={20} alignItems="center" alignContent="center" p={4}>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: 'menu',
          size: 6,
          color: 'black',
        }}
      />
      <Text color="black" fontWeight="bold" fontSize={14}>
        {navText}
      </Text>
    </HStack>
  );
};

export default NavBar;
