import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Gap } from '../../atom';
import Number from '../Number';
import Rating from '../Rating';

const ItemListProduct = ({
  image,
  onPress,
  items,
  number,
  rating,
  price,
  type,
  name,
  date,
  status,
  page,
  products,
  onRemoveFromCart,
  onPay
}) => {
  const renderContent = () => {
    if (page === 'productPage') {
      return (
        <>
          {products.map(item => (
            <View style={styles.content} key={item.id}>
              <Text style={styles.title}>{item.name}</Text>
              <Number style={styles.price} number={item.price} />
            </View>
          ))}
        </>
      );
    }
    switch (type) {
      case 'product':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number style={styles.price} number={price} />
            </View>
            <Rating number={rating} />
          </>
        );
      case 'cart':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.price}>{items} items</Text>
              <Number number={price} style={styles.price} />
            </View>
            <View>
              <Button text="Bayar" onPress={onPay} />
              <Gap height={10} />
              <Button text="Hapus" color="#D9435E" onPress={onRemoveFromCart} />
            </View>
          </>
        );
      case 'order-summary':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number style={styles.price} number={price} />
            </View>
            <Text style={styles.items}>{items} items</Text>
          </>
        );
      case 'in-progress':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      status === 'PENDING'
                        ? '#FE9900' // Warna oren untuk PENDING
                        : status === 'PACKED'
                        ? '#7DDA58' // Warna hijau untuk SUCCESS
                        : 'black', // Warna hitam untuk status lainnya
                  },
                ]}>
                {status === 'PENDING'
                  ? 'Belum Bayar' // Teks untuk PENDING
                  : status === 'PACKED'
                  ? 'Sedang Dikemas' // Teks untuk SUCCESS
                  : status === 'ON_DELIVERY'
                  ? 'Sedang Dikirim' // Teks untuk ON_DELIVERY
                  : 'Status Tidak Diketahui'}{' '}
                {/* Fallback untuk status yang tidak dikenali */}
              </Text>
            </View>
          </>
        );
      case 'past-orders':
        const formatedDate = new Date(date * 1000).toLocaleString('id-ID', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
            <View>
              <Text style={styles.date}>{formatedDate}</Text>
              <Text
                style={[
                  styles.status,
                  {color: status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'},
                ]}>
                {status === 'CANCELLED' ? 'Dibatalkan' : 'Sudah Diterima'}
              </Text>
            </View>
          </>
        );
      default:
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number style={styles.price} number={price} />
            </View>
            <Rating number={rating} />
          </>
        );
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default ItemListProduct;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    resizeMode: 'cover',
    marginRight: 12,
  },
  content: {flex: 1},
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#020202',
  },
  price: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
  items: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#8D92A3',
  },
  status: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#D9435E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D92A3',
    marginHorizontal: 4,
  },
});
