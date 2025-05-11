import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CARD_WIDTH = Dimensions.get('window').width / numColumns - 20;

const HomeCard = ({ item }) => (
  <View style={[styles.card, { backgroundColor: item.color }]}>
    <Text style={styles.value}>{item.value}</Text>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.change}>{item.change}</Text>
  </View>
);

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