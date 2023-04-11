import {Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput';
import {useForm} from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Box, ScrollView} from 'native-base';

export interface ComplaintItem {
  firstDate: string;
  addDesc: string;
  addPhoto: string;
  addIndex: string;
  addName: string;
  //conversion to number goes after the typing, before submitting
  addPrice: string;
  addProblem: string;
}

const PRICE_REGEX = /^-?(?:\d+|\d{1,3}(?:.\d{3})+)(?:(\.)\d+)?$/;
const DATE_REGEX = /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/;

const AddComplaint = ({navigation}: any) => {
  const {control, handleSubmit} = useForm();

  const onAddComplaint = async (data: ComplaintItem) => {
    const userId = auth().currentUser?.uid;
    const secondDate = '00-00-0000';
    const ref = firestore().collection('complaints');
    const id = Math.floor(Math.random() * Date.now()).toString();
    const {
      firstDate,
      addDesc,
      addPhoto,
      addIndex,
      addName,
      addPrice,
      addProblem,
    } = data;
    console.log(data);
    ref.doc(id).set({
      date1: firstDate,
      date2: secondDate,
      desc: addDesc,
      docId: id,
      photo: addPhoto,
      index: addIndex,
      name: addName,
      price: +addPrice,
      problem: addProblem,
      userId: userId,
    });
    navigation.navigate('Reklamacje');
  };

  return (
    <ScrollView>
      <Box
        flex={1}
        w="full"
        bg={{
          linearGradient: {
            colors: ['gray.200', 'gray.800'],
            start: [0, 0],
            end: [2, 1],
          },
        }}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate('Reklamacje')}>
          <AntDesign name="leftcircleo" color="#3b71f3" size={40} />
        </TouchableOpacity>
        <Box
          borderWidth={1.5}
          borderColor={'white'}
          padding={6}
          margin={12}
          borderRadius={10}>
          <Text style={styles.formHeader}>Wypełnij formularz reklamacji</Text>
          <Text>Data złozenia reklamacji</Text>
          <CustomInput
            name="firstDate"
            control={control}
            placeholder="DD-MM-RRRR"
            rules={{
              required: 'Data musi zostać uzupełniona',
              pattern: {
                value: DATE_REGEX,
                message: 'Wprowadzona data ma niepoprawny format',
              },
            }}
          />
          <Text>Powód składania reklamacji</Text>
          <CustomInput
            name="addDesc"
            control={control}
            placeholder="Powód reklamacji"
            rules={{
              required: 'Powód reklamacji musi zostać podany',
            }}
          />
          <Text>Indeks produktu</Text>
          <CustomInput
            name="addIndex"
            control={control}
            placeholder="Numer katalogowy produktu"
            rules={{
              required: 'Numer katalogowy produktu musi zostać podany',
            }}
          />
          <Text>Adres url zdjęcia produktu</Text>
          <CustomInput
            name="addPhoto"
            control={control}
            placeholder="Adres URL zdjęcia produktu"
            rules={{
              required:
                'Adres URL zdjęcia powinien zostać podany, aby poprawnie wyświetlić zdjęcie produktu',
            }}
          />
          <Text>Nazwa produktu</Text>
          <CustomInput
            name="addName"
            control={control}
            placeholder="Nazwa produktu"
            rules={{
              required: 'Nazwa produktu musi zostać uzupełniona',
            }}
          />
          <Text>Wartość produktu</Text>
          <CustomInput
            name="addPrice"
            keyboardType="decimal-pad"
            control={control}
            placeholder="Wartość produktu"
            rules={{
              required: 'Nazwa produktu musi zostać uzupełniona',
              pattern: {
                value: PRICE_REGEX,
                message:
                  'Wprowadzona kwota ma niepoprawny format, być moze zastosuj kropkę zamiast przecinka',
              },
            }}
          />
          <Text>Dokładny opis problemu</Text>
          <CustomInput
            name="addProblem"
            control={control}
            placeholder="Opis problemu"
            rules={{
              required: '"Dokładny opis problemu musi zostać uzupełniony"',
              minLength: {
                value: 10,
                message: 'Dokładny opis powinien być nieco dłuszy 😰',
              },
            }}
          />
        </Box>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSubmit(onAddComplaint)}>
          <AntDesign name="save" color="white" size={20} />
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};

export default AddComplaint;

const styles = StyleSheet.create({
  formHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  btn: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#4285F4',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
  },
  container: {
    width: '80%',
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  saveBtn: {
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    width: 45,
    height: 45,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    marginTop: 750,
    marginLeft: 340,
  },
});
