import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

let data = [
  {
    id: 1,
    icon: 'snowflake',
    tile: 'Welcome #Devember',
    desc: 'Monitor your spending and contribution, ensuring every penny aligns with your family inspirations',
  },
  {
    id: 2,
    icon: 'snowman',
    tile: 'Learn for 24 days',
    desc: 'Monitor your spending and contribution, ensuring every penny aligns with your family inspirations',
  },
  {
    id: 3,
    icon: 'snowboarding',
    tile: 'Contribute if you can for children',
    desc: 'Monitor your spending and contribution, ensuring every penny aligns with your family inspirations',
  },
];

const OnBoardingScreen = (props: any) => {
  let [index, setIndex] = useState(0);
  let renderHere = data[index];

  let goToNextScreen = () => {
    if (index >= data.length - 1) {
      setIndex(0);
      props.navigation.goBack();
    } else setIndex(index + 1);
  };
  let goToDayTwoScreen = () => {
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.safe} key={renderHere.id}>
      <Icon
        name={renderHere.icon}
        size={100}
        color="#CEF202"
        style={{alignSelf: 'center', margin: 20}}
      />
      <View style={{marginTop: 'auto', marginBottom: 15}}>
        <Text
          style={{
            color: 'white',
            fontWeight: '800',
            fontSize: 25,
            letterSpacing: 1,
            marginBottom: 5,
          }}>
          {renderHere.tile}
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 15,
            letterSpacing: 1,
          }}>
          {renderHere.desc}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TouchableOpacity onPress={goToDayTwoScreen}>
          <Text style={{color: '#fff'}}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToNextScreen()}
          style={{
            backgroundColor: 'grey',
            height: 35,
            width: 200,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

let styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#15141A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
