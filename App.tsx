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
import NumbersScreen from './src/components/core/NumbersScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Day1 from './src/components/core/Day1';
import Day2 from './src/components/core/Day2';
import OnBoardingScreen from './src/components/core/OnBoardingScreen';
import Day3 from './src/components/core/Day3';
import ContactList from './src/components/core/ContactList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={NumbersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Day1"
          component={Day1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Day2"
          component={Day2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnBoardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Day3"
          component={Day3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactList"
          component={ContactList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  quicksandLight: {
    fontFamily: 'Inter-Light',
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
  },
  ralewayItalic: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  ralewayThin: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
});
