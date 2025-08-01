import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet} from 'react-native';

const Select = ({label, value, onSelectChange, items = []}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Pilih Kota" value="" /> {/* Optional default */}
          {items.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
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
  picker: {
  color: '#020202', // warna teks hitam
  backgroundColor: '#fff', // latar putih
},
});
