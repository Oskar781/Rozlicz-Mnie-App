import {
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Box, Text, useColorModeValue} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const ComplaintDetails = ({route, navigation}: any) => {
  const selectedItemId = route.params.itemId;
  const [isLoading, setIsLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  const ref = firestore()
    .collection('complaints')
    .where('userId', '==', auth().currentUser?.uid);

  useEffect(() => {
    let name = complaints.map(a => a.name).toString();
    navigation.setOptions({
      title: name,

      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => {
        return (
          <TouchableOpacity style={styles.addBtn} onPress={showAlert}>
            <Entypo name="trash" color="white" size={20} />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, complaints, showAlert]);

  const loadToDoList = async () => {
    ref.where('docId', '==', selectedItemId).onSnapshot(querySnapshot => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const complaints:
        | ((prevState: never[]) => never[])
        | FirebaseFirestoreTypes.DocumentData[] = [];
      querySnapshot.forEach(doc => {
        let complaint = doc.data();
        complaint.id = doc.id;
        complaints.push(complaint);
      });
      setComplaints(complaints);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    loadToDoList();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteItem = async () => {
    await firestore().collection('complaints').doc(selectedItemId).delete();
    navigation.navigate('Reklamacje');
  };

  const showAlert = useCallback(
    () =>
      Alert.alert(
        'Cześć 👋',
        'Czy napewno chcesz usunąć ten element ? Informacje o reklamacjach mogą się jeszcze kiedyś przydać.',
        [
          {text: 'Tak', onPress: () => deleteItem()},
          {
            text: 'Jednak nie 🤔',
            onPress: () =>
              Alert.alert('Całe szczęście, lepiej nie usuwać takich rzeczy 😮‍💨'),
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert('Całe szczęście, lepiej nie usuwać takich rzeczy 😮‍💨'),
        },
        //on clicking out side, Alert will not dismiss
      ),
    [deleteItem],
  );

  const renderToDoItem = ({item}: any) => {
    return (
      <Box>
        <Image source={{uri: `${item.photo}`}} style={styles.image} />
        <Text style={styles.text1}>Nazwa towaru : </Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text1}>Indeks towaru 🔢 :</Text>
        <Text style={styles.text}>{item.index}</Text>
        <Text style={styles.text1}>Data przyjęcia reklamacji 📅 :</Text>
        <Text style={styles.text}>{item.date1}</Text>
        <Text style={styles.text1}>Zgłaszany problem ❌ :</Text>
        <Text style={styles.text}>{item.problem}</Text>
        <Text style={styles.text1}>Data rozpatrzenia reklamacji 📅 :</Text>
        <Text style={styles.text}>{item.date2}</Text>
        <Text style={styles.text1}>Opis reklamacji ✍🏼 :</Text>
        <Text style={styles.text}>{item.desc}</Text>
        <Text style={styles.text1}>Wartość 💰 :</Text>
        <Text style={styles.text}>{item.price} PLN</Text>
      </Box>
    );
  };

  const showToDoList = () => {
    return (
      <>
        <FlatList
          data={complaints}
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

export default ComplaintDetails;

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
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
});
