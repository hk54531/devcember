import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Animated} from 'react-native';

const CustomToggleSwitch = ({initialValue, onToggle}: any) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const ballPosition = useState(new Animated.Value(initialValue ? 1 : 0))[0];

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggle && onToggle(newValue);
    Animated.timing(ballPosition, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const ballTranslateX = ballPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      style={[
        styles.toggleButton,
        {
          backgroundColor: isEnabled
            ? 'rgba(52, 211, 153, 1)'
            : 'rgba(218, 218, 218, 1)',
        },
      ]}>
      <Animated.View
        style={[styles.ball, {transform: [{translateX: ballTranslateX}]}]}
      />
      {/* <Text style={styles.toggleText}>{isEnabled ? 'ON' : 'OFF'}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 40,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    zIndex: 1,
  },
  ball: {
    width: 15,
    height: 15,
    borderRadius: 13,
    backgroundColor: 'white',
    position: 'absolute',
    left: 2,
    top: 2,
  },
});

export default CustomToggleSwitch;
