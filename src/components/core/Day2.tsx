import {View, Text, SafeAreaView, Button} from 'react-native';
import React from 'react';

const Day2 = (props: any) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 5}}>Day 2</Text>
      <Button
        title="OnBoarding Screen"
        onPress={() => props.navigation.navigate('OnBoardingScreen')}
        color="#841584"
      />
    </SafeAreaView>
  );
};

export default Day2;
