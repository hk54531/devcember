import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomToggleSwitch from './CustomToggleButton';

const Notifications = () => {
  let [inAppNotifications, setinAppNotifications] = useState(false);
  const handleToggle = (value: string) => {
    console.log('Toggle switched to:', value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(255, 255, 255, 1)"
        barStyle="light-content"
      />
      <View style={styles.backBtnView}>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="chevron-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <View style={styles.whiteBg}>
        <View>
          <View style={styles.messageNotificationsContainer}>
            <Text style={styles.messaseNotifications}>
              Message Notifications
            </Text>
          </View>
          <View style={styles.showNotifications}>
            <Text style={styles.showText}>Show Notifications</Text>
            <CustomToggleSwitch initialValue={false} onToggle={handleToggle} />
          </View>
          <TouchableOpacity style={styles.selectSoundView}>
            <Text style={styles.selectSound}>Select Sound</Text>
            <View style={styles.arrowView}>
              <Text style={styles.selectedSound}>Xylophone</Text>
              <Ionicons
                name="chevron-forward-outline"
                color={'rgba(102, 102, 102, 1)'}
                size={20}
                style={styles.arrowSpace}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.messageNotificationsContainer}>
            <Text style={styles.messaseNotifications}>Group Notifications</Text>
          </View>
          <View style={styles.showNotifications}>
            <Text style={styles.showText}>Show Notifications</Text>
            <CustomToggleSwitch initialValue={false} onToggle={handleToggle} />
          </View>
          <TouchableOpacity style={styles.selectSoundView}>
            <Text style={styles.selectSound}>Select Sound</Text>
            <View style={styles.arrowView}>
              <Text style={styles.selectedSound}>Xylophone</Text>
              <Ionicons
                name="chevron-forward-outline"
                color={'rgba(102, 102, 102, 1)'}
                size={20}
                style={styles.arrowSpace}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.messageNotificationsContainer}>
            <Text style={styles.messaseNotifications}>Other Settings</Text>
          </View>
          <TouchableOpacity style={styles.selectSoundView}>
            <Text style={styles.selectSound}>In-App Notifications</Text>
            <View style={styles.arrowView}>
              <Ionicons
                name="chevron-forward-outline"
                color={'rgba(102, 102, 102, 1)'}
                size={20}
                style={styles.arrowSpace}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.showNotifications}>
            <Text style={styles.showText}>Show Preview</Text>
            <CustomToggleSwitch initialValue={false} onToggle={handleToggle} />
          </View>
        </View>
      </View>
      <Modal
        data-testid="modalll"
        transparent={true}
        onRequestClose={() => setinAppNotifications(!inAppNotifications)}
        visible={inAppNotifications}>
        <TouchableOpacity
          testID="isModalTest"
          onPressOut={() => setinAppNotifications(!inAppNotifications)}
          style={{flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
          <TouchableWithoutFeedback>
            <>
              <View
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.9)',
                  height: responsiveHeight(30),
                  borderRadius: 20,
                  marginTop: 'auto',
                  // paddingVertical: responsiveHeight(2),
                  // paddingHorizontal: responsiveHeight(1),
                  marginHorizontal: responsiveWidth(3),
                }}>
                <Text
                  style={{
                    color: 'rgba(102, 102, 102, 1)',
                    fontSize: 16,
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    lineHeight: 18,
                    alignSelf: 'center',
                    paddingVertical: responsiveHeight(2.5),
                  }}>
                  Mute Notifications
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // setMuteValue('8 Hours');
                    setinAppNotifications(!inAppNotifications);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    8 Hours
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // setMuteValue('1 Week');
                    setinAppNotifications(!inAppNotifications);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderBottomWidth: 1,
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    1 Week
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // setMuteValue('Always');
                    setinAppNotifications(!inAppNotifications);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    Always
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setinAppNotifications(inAppNotifications);
                }}
                style={{
                  backgroundColor: 'white',
                  paddingVertical: responsiveHeight(2),
                  paddingHorizontal: responsiveHeight(1),
                  margin: responsiveHeight(2),
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'rgba(59, 38, 130, 1)',
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    lineHeight: 22,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Notifications;

let styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(59, 38, 130, 1)', flex: 1},
  backBtnView: {
    backgroundColor: 'rgba(59, 38, 130, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    paddingHorizontal: responsiveWidth(3),
  },
  backBtn: {position: 'absolute', left: 1},
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 22,
  },
  whiteBg: {backgroundColor: '#fff', flex: 1},
  messageNotificationsContainer: {
    backgroundColor: 'rgba(242, 240, 247, 1)',
    padding: responsiveHeight(2),
  },
  messaseNotifications: {
    color: 'rgba(102, 102, 102, 1)',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
  },
  showNotifications: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveHeight(2),
    borderBottomWidth: 1,
    borderColor: 'rgba(242, 240, 247, 1)',
  },
  showText: {
    color: 'rgba(31, 31, 31, 1)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 24,
  },
  selectSoundView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveHeight(2),
    borderBottomWidth: 1,
    borderColor: 'rgba(242, 240, 247, 1)',
  },
  selectSound: {
    color: 'rgba(31, 31, 31, 1)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 24,
  },
  arrowView: {flexDirection: 'row', alignItems: 'center'},
  selectedSound: {
    color: 'rgba(102, 102, 102, 1)',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins',
    lineHeight: 24,
  },
  arrowSpace: {marginLeft: 'auto'},
});

// import React, {useState} from 'react';
// import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';

// const CustomToggleButton = () => {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const ballPosition = useState(new Animated.Value(0))[0];

//   const toggleSwitch = () => {
//     setIsEnabled(previousState => !previousState);
//     Animated.timing(ballPosition, {
//       toValue: isEnabled ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const ballTranslateX = ballPosition.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 30],
//   });

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         activeOpacity={0.8}
//         onPress={toggleSwitch}
//         style={[
//           styles.toggleButton,
//           {backgroundColor: isEnabled ? 'green' : 'gray'},
//         ]}>
//         <Animated.View
//           style={[styles.ball, {transform: [{translateX: ballTranslateX}]}]}
//         />
//         {/* <Text style={styles.toggleText}>{isEnabled ? 'ON' : 'OFF'}</Text> */}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   toggleButton: {
//     width: 60,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   toggleText: {
//     color: 'white',
//     fontSize: 16,
//     position: 'absolute',
//     zIndex: 1,
//   },
//   ball: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     backgroundColor: 'white',
//     position: 'absolute',
//     left: 2,
//     top: 2,
//   },
// });

// export default CustomToggleButton;
