import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const Day1 = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Text style={{fontSize: 60, fontFamily: 'Inter-SemiBold'}}>
        Day one details screen
      </Text>
    </SafeAreaView>
  );
};

export default Day1;
