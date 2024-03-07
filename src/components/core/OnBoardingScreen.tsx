import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const OnBoardingScreen = () => {
  return (
    <SafeAreaView>
      <Text>OnBoardingScreen</Text>
      <Icon name="rocket" size={30} color="#900" />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
