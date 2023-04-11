import {
  Button,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, useColorModeValue, HStack, Center} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PaymentItem from '../components/PaymentItem';

const ToPay = ({navigation}: any) => {
  const selectItemHandler = id => {
    navigation.navigate('ComplaintDetails', {itemId: id});
  };

  const [isLoading, setIsLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const ref = firestore()
    .collection('complaints')
    .where('userId', '==', auth().currentUser?.uid);

  const loadToDoList = async () => {
    ref.onSnapshot(querySnapshot => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const complaints = [];
      querySnapshot.forEach(doc => {
        let complaint = doc.data();
        complaint.id = doc.id;
        complaints.push(complaint);
      });
      setComplaints(complaints);
      setIsLoading(false);
    });
  };

  const price = complaints.map(item => item.price);
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
          <Text bold>Suma wartości towaru</Text>
          <Text bold>{sum} PLN</Text>
        </Box>
        {/* <Box margin={2}>
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
        </Box> */}
        <FlatList
          data={complaints}
          renderItem={renderToDoItem}
          keyExtractor={item => item.id}
          style={{height: '83%'}}
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
      <Header title="" image={require('../assets/repair.png')}>
        <NavBar navText="Reklamacje" />
      </Header>
      <Box
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.100', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <View>{showContent()}</View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddComplaint')}>
          <AntDesign name="plus" color="white" size={20} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default ToPay;

const styles = StyleSheet.create({
  addBtn: {
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    width: 45,
    height: 45,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    marginTop: 490,
    marginLeft: 340,
  },
});
