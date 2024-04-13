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

// import {StatusBar, StyleSheet, View, Text, ImageBackground} from 'react-native';
// import React, {useState} from 'react';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {StackNavigationProp} from '@react-navigation/stack';
// import FastImage from 'react-native-fast-image';
// import CustomButton from '../components/common/CustomButton';

// let data = [
//   {
//     id: 1,
//     imgUrl: 'https://i.postimg.cc/sx14t82n/Rectangle-569-3.png',
//     tile: 'Your Journey Made',
//     highlightedText: 'Memorable',
//     desc: 'Get ready for a seamless journey with our bus services',
//     buttonName: 'Next',
//   },
//   {
//     id: 2,
//     imgUrl: 'https://i.postimg.cc/tCZzkLwJ/Rectangle-569-4.png',
//     tile: 'Travel Made Simple',
//     highlightedText: 'Book Now',
//     desc: 'Get ready for a seamless journey with our bus services',
//     buttonName: 'Next',
//   },
//   {
//     id: 3,
//     imgUrl: 'https://i.postimg.cc/ncyGP3fk/Rectangle-569-5.png',
//     tile: 'Get Seats at Lowest',
//     highlightedText: 'Prices',
//     desc: 'Get ready for a seamless journey with our bus services',
//     buttonName: 'Get Started',
//   },
// ];

// interface IProps {
//   navigation: StackNavigationProp<any>;
// }

// interface IState {}

// const DotsIndicator = ({index}: {index: number}) => {
//   return (
//     <View style={styles.dotsContainer}>
//       {[0, 1, 2].map(idx => (
//         <View
//           key={idx}
//           style={[
//             styles.dot,
//             {
//               backgroundColor:
//                 idx - 1 < index
//                   ? 'rgba(38, 50, 56, 1)'
//                   : 'rgba(99, 118, 126, 1)',
//             },
//           ]}
//         />
//       ))}
//     </View>
//   );
// };

// const OnboardingScreens: React.FC<IProps> = props => {
//   let [index, setIndex] = useState(0);
//   let renderHere = data[index];

//   const goToNextScreen = () => {
//     if (index >= data.length - 1) {
//       setIndex(0);
//       props.navigation.navigate('Login');
//     } else {
//       setIndex(index + 1);
//     }
//   };

//   return (
//     <>
//       <StatusBar translucent backgroundColor={'transparent'} />
//       <ImageBackground
//         style={styles.container}
//         source={{uri: 'https://i.postimg.cc/rytRQCdD/Rectangle-553.png'}}
//         resizeMode="cover">
//         <View>
//           <View style={styles.overallContainer}>
//             <View style={styles.imageContainer}>
//               <FastImage
//                 source={{
//                   uri: renderHere.imgUrl,
//                   priority: FastImage.priority.high,
//                   cache: FastImage.cacheControl.immutable,
//                 }}
//                 style={styles.image}
//               />

//               <FastImage
//                 source={{
//                   uri: 'https://i.postimg.cc/Bv78cFyp/Rectangle-570.png',
//                 }}
//                 style={styles.linearGd}
//               />
//             </View>
//             <View style={{}}>
//               <Text style={styles.title}>{renderHere.tile}</Text>
//               <Text style={styles.highlightedTextStyle}>
//                 {renderHere.highlightedText}
//               </Text>
//               <View style={styles.description}>
//                 <Text style={styles.descText}>{renderHere.desc}</Text>
//               </View>
//             </View>
//             <DotsIndicator index={index} />
//             <View style={styles.makeCenterAlign}>
//               <CustomButton
//                 getStatus={() => true}
//                 submitfunction={() => {
//                   goToNextScreen();
//                 }}
//                 continue={renderHere.buttonName}
//               />
//             </View>
//           </View>
//         </View>
//       </ImageBackground>
//     </>
//   );
// };

// export default OnboardingScreens;

// const styles = StyleSheet.create({
//   makeCenterAlign: {alignSelf: 'center'},
//   container: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   overallContainer: {marginBottom: 15},
//   imageContainer: {
//     width: '100%',
//     height: responsiveHeight(65),
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   touchableOpacity1: {marginBottom: responsiveHeight(6)},
//   view61: {
//     borderRadius: 25,
//     overflow: 'hidden',
//     backgroundColor: '#ccc',
//     marginTop: responsiveHeight(2),
//     height: responsiveHeight(7),
//     width: responsiveWidth(90),
//   },
//   linearGd: {
//     position: 'absolute',
//     bottom: 0,
//     height: responsiveHeight(25),
//     width: responsiveWidth(100),
//   },
//   txtView: {
//     height: responsiveHeight(7),
//     width: responsiveWidth(90),
//     marginTop: responsiveHeight(-1.7),
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: responsiveHeight(3.65),
//   },
//   txt45: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     lineHeight: 27,
//     fontFamily: 'Raleway',
//     textAlign: 'center',
//   },
//   title: {
//     color: 'black',
//     fontWeight: '700',
//     fontSize: 30,
//     lineHeight: 40,
//     fontFamily: 'Raleway',
//     textAlign: 'center',
//   },
//   highlightedTextStyle: {
//     color: 'rgba(108, 139, 255, 1)',
//     fontWeight: '700',
//     fontSize: 30,
//     lineHeight: 40,
//     fontFamily: 'Raleway',
//     textAlign: 'center',
//   },
//   description: {
//     width: responsiveWidth(70),
//     alignSelf: 'center',
//     marginBottom: responsiveHeight(2),
//   },
//   linearBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   descText: {
//     color: 'rgba(99, 118, 126, 1)',
//     fontWeight: '500',
//     fontSize: 16,
//     lineHeight: 24,
//     fontFamily: 'Raleway',
//     textAlign: 'center',
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
// });
