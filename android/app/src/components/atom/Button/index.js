import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({text, color = '#03987A', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({backgroundColor: color, padding: 12, borderRadius: 8}),
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    textAlign: 'center',
  },
});
