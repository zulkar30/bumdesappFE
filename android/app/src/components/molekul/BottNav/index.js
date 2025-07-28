import React from 'react';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import {
  IcCartOff,
  IcCartOn,
  IcHomeOff,
  IcHomeOn,
  IcOrderOff,
  IcOrderOn,
  IcProfileOff,
  IcProfileOn,
} from '../../../assets';

const Icon = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return focus ? <IcHomeOn /> : <IcHomeOff />;
    case 'Order':
      return focus ? <IcOrderOn /> : <IcOrderOff />;
    case 'Cart':
      return focus ? <IcCartOn /> : <IcCartOff />;
    case 'Profile':
      return focus ? <IcProfileOn /> : <IcProfileOff />;
    default:
      return focus ? <IcOrderOn /> : <IcOrderOff />;
  }
};

const BottNav = ({state, descriptors, navigation}) => {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View style={styles.page}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Icon label={label} focus={isFocused} />
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default BottNav;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 13,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
  },
});
