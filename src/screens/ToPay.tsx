import {
  Button,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

import {Box, Text, useColorModeValue, HStack, Center} from 'native-base';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PaymentItem from '../components/PaymentItem';

const ToPay = ({navigation}: any) => {
  const selectItemHandler = id => {
    navigation.navigate('ItemDetails', {itemId: id});
  };
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const ref = firestore()
    .collection('payments')
    .where('userId', '==', auth().currentUser?.uid);

  const loadToDoList = async () => {
    ref.where('complete', '==', false).onSnapshot(querySnapshot => {
      const payments = [];
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
          <Text bold>Suma zaległości</Text>
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

  // const showSendVerificationEmail = () => {
  //   return (
  //     <View>
  //       <Text>
  //         Proszę dokonaj weryfikacji przez adres email, bez tego nie będziesz
  //         mógł korzystać z aplikacji. Jeśli dokonałeś weryfikacji, natomiast
  //         dalej widzisz ten komunikat, wyloguj się i zaloguj ponownie na konto.
  //       </Text>
  //       <Button
  //         title="Wyślij ponownie email weryfikacyjny"
  //         onPress={() => {
  //           auth().currentUser?.sendEmailVerification();
  //         }}
  //       />
  //       <Button onPress={() => logout()} title="Wyloguj się" />
  //     </View>
  //   );
  // };

  return (
    <Box
      flex={1}
      bg={useColorModeValue('warmGray.100', 'primary.900')}
      w="full">
      <Header title="" image={require('../assets/pay.png')}>
        <NavBar navText="Do zapłaty" />
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
  button: {
    margin: 10,
  },
});

export default ToPay;
