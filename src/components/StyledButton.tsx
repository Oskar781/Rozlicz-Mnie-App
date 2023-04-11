import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Text, Pressable, useColorModeValue} from 'native-base';

const StyledButton = ({onPress, text}: any) => {
  return (
    <Box style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.button}
        bg={useColorModeValue('warmGray.700', 'darkBlue.400')}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </Box>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
