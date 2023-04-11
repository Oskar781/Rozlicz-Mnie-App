import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {Box, Text, useColorModeValue, HStack, Center} from 'native-base';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PaymentItem from '../components/PaymentItem';

const ToPay = ({navigation}: any) => {
  const selectItemHandler = (id: string) => {
    navigation.navigate('ItemDetails', {itemId: id});
  };

  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const ref = firestore()
    .collection('payments')
    .where('userId', '==', auth().currentUser?.uid);

  const loadToDoList = async () => {
    ref.where('complete', '==', true).onSnapshot(querySnapshot => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const payments: React.SetStateAction<any[]> = [];
      querySnapshot.forEach(doc => {
        let payment = doc.data();
        payment.id = doc.id;
        payments.push(payment);
      });
      setPayments(payments);
      setIsLoading(false);
    });
  };

  const price = payments.map(item => item.price);
  const sum = price.reduce((partialSum, a) => partialSum + a, 0).toFixed(2);

  if (isLoading) {
    loadToDoList();
  }

  const renderToDoItem = ({item}: any) => {
    return <PaymentItem item={item} onSelect={selectItemHandler} />;
  };

  const showToDoList = () => {
    return (
      <>
        <Box flexDirection="row" justifyContent="space-between">
          <Text bold>Wartość zakupionego towaru</Text>
          <Text bold>{sum} PLN</Text>
        </Box>
        <View style={styles.topTable}>
          <Box margin={2}>
            <HStack space={1}>
              <Center w="33%">
                <Text>Nazwa</Text>
              </Center>
              <Center w="33%">
                <Text>Indeks</Text>
              </Center>
              <Center w="33%">
                <Text>Wartość</Text>
              </Center>
            </HStack>
          </Box>
        </View>
        <FlatList
          data={payments}
          renderItem={renderToDoItem}
          keyExtractor={item => item.id}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: '74%'}}
        />
      </>
    );
  };

  const showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
      </View>
    );
  };

  return (
    <Box
      flex={1}
      bg={useColorModeValue('warmGray.100', 'primary.900')}
      w="full">
      <Header title="" image={require('../assets/done.png')}>
        <NavBar navText="Zapłacone" />
      </Header>
      <Box
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.100', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <View>{showContent()}</View>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  topTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    width: '20%',
  },
  index: {
    width: '20%',
  },
});

export default ToPay;
