import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet} from 'react-native';

const Select = ({label, value, onSelectChange}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="Bengkalis" value="Bengkalis" />
          <Picker.Item label="Dumai" value="Dumai" />
          <Picker.Item label="Duri" value="Duri" />
          <Picker.Item label="Pekanbaru" value="Pekanbaru" />
          <Picker.Item label="Selatpanjang" value="Selatpanjang" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
});
