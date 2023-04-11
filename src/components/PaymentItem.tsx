import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Text, HStack, Center, useColorModeValue} from 'native-base';

const PaymentItem = ({item, onSelect}: any) => {
  return (
    <Box m={2}>
      <TouchableOpacity onPress={onSelect.bind(this, item.id)}>
        <HStack
          space={2}
          bg={useColorModeValue('warmGray.200', 'primary.700')}
          borderRadius={6}>
          <Center w="33%">
            <Image source={{uri: `${item.photo}`}} style={styles.image} />
          </Center>
          <Box w="66%" mt={3}>
            <Text style={styles.itemNameText}>{item.name}</Text>
            <Text>Indeks: {item.index}</Text>
            <Text style={styles.itemPriceText}>
              Wartość 💰 {item.price.toFixed(2)} PLN
            </Text>
          </Box>
          {/* <Center w="33%">
            <Text>{item.price.toFixed(2)}</Text>
          </Center> */}
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default PaymentItem;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
    marginLeft: 20,
    marginVertical: 10,
  },
  itemNameText: {
    fontWeight: '600',
    marginVertical: 2,
  },
  itemPriceText: {
    fontWeight: '600',
    marginTop: 14,
  },
});
