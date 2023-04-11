import React from 'react';
import {Button, Icon, IButtonProps} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

interface Props extends IButtonProps {
  active: boolean;
  icon: string;
  children: React.ReactNode;
}

const MenuButton = ({active, icon, children, ...props}: Props) => {
  return (
    <Button
      size="lg"
      _light={{
        colorScheme: 'blue',
        _pressed: {
          bg: 'primary.100',
        },
        _text: {
          color: active ? 'blue.500' : 'blue.500',
        },
      }}
      _dark={{
        colorScheme: 'darkBlue',
        _pressed: {
          bg: 'primary.600',
        },
        _text: {
          color: active ? 'blue.500' : undefined,
        },
      }}
      bg={active ? 'blue.100' : 'transparent'}
      variant="solid"
      justifyContent="flex-start"
      leftIcon={
        <Icon
          as={Feather}
          name={icon}
          size="sm"
          _light={{
            color: 'blue.500',
          }}
          _dark={{color: active ? 'blue.500' : 'blueGray.100'}}
        />
      }
      {...props}>
      {children}
    </Button>
  );
};

export default MenuButton;
