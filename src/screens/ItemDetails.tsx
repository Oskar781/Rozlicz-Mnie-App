import {ActivityIndicator, FlatList, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Box, Text, useColorModeValue} from 'native-base';

const ItemDetails = ({route, navigation}: any) => {
  const selectedItemId = route.params.itemId;
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  const ref = firestore()
    .collection('payments')
    .where('userId', '==', auth().currentUser?.uid);

  useEffect(() => {
    let name = payments.map(a => a.name).toString();
    navigation.setOptions({title: name});
  }, [navigation, payments]);

  const loadToDoList = async () => {
    ref.where('docId', '==', selectedItemId).onSnapshot(querySnapshot => {
      const payments:
        | ((prevState: never[]) => never[])
        | FirebaseFirestoreTypes.DocumentData[] = [];
      querySnapshot.forEach(doc => {
        let payment = doc.data();
        payment.id = doc.id;
        payments.push(payment);
      });
      setPayments(payments);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    loadToDoList();
  }

  const renderToDoItem = ({item}: any) => {
    return (
      <Box>
        <Image source={{uri: `${item.photo}`}} style={styles.image} />
        <Text style={styles.text1}>Nazwa towaru :</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text1}>Data zakupu w formacie DD-MM-RRRR:</Text>
        <Text style={styles.text}>{item.date}</Text>
        <Text style={styles.text1}>Indeks towaru :</Text>
        <Text style={styles.text}>{item.index}</Text>
        <Text style={styles.text1}>Cena jednostkowa :</Text>
        <Text style={styles.text}>{item.singlePrice} PLN</Text>
        <Text style={styles.text1}>Ilość :</Text>
        <Text style={styles.text}>{item.quantity}</Text>
        <Text style={styles.text1}>Wartość końcowa :</Text>
        <Text style={styles.text}>{item.price} PLN</Text>
      </Box>
    );
  };

  const showToDoList = () => {
    return (
      <>
        <FlatList
          data={payments}
          renderItem={renderToDoItem}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{height: '90%'}}
        />
      </>
    );
  };

  const showContent = () => {
    return (
      <Box>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
      </Box>
    );
  };

  return (
    <Box flex={1} bg={useColorModeValue('warmGray.50', 'primary.900')} w="full">
      {showContent()}
    </Box>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    padding: 16,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    marginBottom: 10,
  },
  text1: {
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    padding: 16,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    fontWeight: '900',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomRightRadius: 6,
    padding: 16,
  },
});
