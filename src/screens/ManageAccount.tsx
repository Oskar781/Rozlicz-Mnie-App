import React from 'react';
import {Box, ScrollView, useColorModeValue} from 'native-base';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import StyledButton from '../components/StyledButton';

const ManageAccount = ({navigation}: any) => {
  return (
    <Box flex={1} bg={useColorModeValue('warmGray.50', 'primary.900')} w="full">
      <Header title="" image={require('../assets/options.png')}>
        <NavBar navText="Ustawienia konta" />
      </Header>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.btnText}>Zmień hasło 🔐</Text>
        </TouchableOpacity>
      </ScrollView>
    </Box>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
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
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    marginTop: 30,
    marginLeft: 12,
  },
});
