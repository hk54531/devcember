import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';

// let days = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24,
// ];

let days = [...Array(24)].map((val: any, index: number) => index + 1);

const NumbersScreen = (props: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <FlatList
        data={days}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(`Day${item}`)}
            key={item}
            style={styles.subContainer}>
            <Text style={styles.quicksandLight}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <Text style={styles.quicksandRegular}>
          This text uses a quick sand font
        </Text>
        <Text style={styles.quicksandLight}>
          This text uses a quick sand light font
        </Text>
        <Text style={styles.ralewayThin}>
          This text uses a thin italic raleway font
        </Text>
        <Text style={styles.ralewayItalic}>
          This text uses a thin italic raleway font
        </Text> */}
    </SafeAreaView>
  );
};

export default NumbersScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 0.5,
    aspectRatio: 1,
    backgroundColor: '#F9EDE3',
    borderColor: '#9b4521',
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quicksandLight: {
    fontFamily: 'Inter-Light',
    fontSize: 70,
    color: 'grey',
  },
});
