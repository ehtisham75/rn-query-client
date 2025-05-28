import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ScreenNames from '../constants/ScreenNames';

const numColumns = 2;
const CARD_WIDTH = Dimensions.get('window').width / numColumns - 20;

const HomeCard = ({ item, onAction }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    if (item.title === 'Read Posts') {
      navigation.navigate(ScreenNames.posts)
      return
    }
    if (item.title === 'Create Posts') {
      navigation.navigate(ScreenNames.createPosts)
      return
    }
    if (item.title === 'Likes') {
      navigation.navigate(ScreenNames.interactions)
      return
    }
  }
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}
      onPress={handleCardPress} activeOpacity={0.7}>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.change}>{item.change}</Text>
    </TouchableOpacity>
  )
};

export default HomeCard

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  change: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
  },
})