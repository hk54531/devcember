import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import DayListItem from './src/components/core/DayListItem';

// let days = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24,
// ];

let days = [...Array(24)].map((val: any, index: number) => index + 1);

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <FlatList
        data={days}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{}}
        renderItem={({item}) => <DayListItem day={item} />}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
