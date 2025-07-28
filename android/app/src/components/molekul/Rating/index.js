import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcStarOff, IcStarOn} from '../../../assets';
import Number from '../Number';

const Rating = ({number}) => {
  const renderStar = () => {
    let star = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= number) {
        star.push(<IcStarOn key={i} />);
      } else {
        star.push(<IcStarOff key={i} />);
      }
    }
    return star;
  };
  return (
    <View style={styles.starRatingContainer}>
      <View style={styles.starContainer}>{renderStar()}</View>
      <Number style={styles.numberRating} number={number} type="decimal" />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  starRatingContainer: {flexDirection: 'row'},
  starContainer: {flexDirection: 'row', marginRight: 4},
  numberRating: {fontSize: 12, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
});
