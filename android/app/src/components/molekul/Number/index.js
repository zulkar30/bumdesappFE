import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Number = ({number, type='currency', style}) => {
  const formatNumber = (num, type) => {
    if (type === 'decimal') {
      return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(num);
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return <Text style={style}>{formatNumber(number, type)}</Text>;
};

export default Number;

const styles = StyleSheet.create({});
