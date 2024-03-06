import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const DayListItem = (props: {day: number}) => {
  return (
    <TouchableOpacity key={props.day} style={styles.subContainer}>
      <Text style={{fontSize: 70, color: 'grey'}}>{props.day}</Text>
    </TouchableOpacity>
  );
};

export default DayListItem;

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
});
