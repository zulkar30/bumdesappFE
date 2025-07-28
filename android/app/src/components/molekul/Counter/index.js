import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBtnAdd, IcBtnMin} from '../../../assets';

const Counter = ({onValueChange}) => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    onValueChange(value);
  }, []);
  let result = value;
  const onCount = type => {
    if (type === 'plus') {
      result = value + 1;
    }
    if (type === 'minus') {
      if (value > 1) {
        result = value - 1;
      }
    }
    setValue(result);
    onValueChange(result);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onCount('minus')}>
        <IcBtnMin />
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onCount('plus')}>
        <IcBtnAdd />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginHorizontal: 10,
  },
});
