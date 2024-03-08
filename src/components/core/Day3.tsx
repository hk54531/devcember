import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';

const Day3 = (props: any) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 5}}>Day 3</Text>
      <Button
        title="ContactList Screen"
        onPress={() => props.navigation.navigate('ContactList')}
        color="#841584"
      />
    </SafeAreaView>
  );
};

export default Day3;
