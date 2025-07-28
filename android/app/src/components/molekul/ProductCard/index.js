import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Rating from '../Rating';

const ProductCard = ({image, name, rating, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.bottContent}>
          <Text style={styles.text}>{name}</Text>
          <Rating number={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 24,
  },
  image: {
    width: 200,
    height: 140,
    resizeMode: 'cover',
  },
  bottContent: {
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  starRatingContainer: {flexDirection: 'row'},
  starContainer: {flexDirection: 'row'},
});
