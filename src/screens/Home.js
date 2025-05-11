import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import HomeCard from '../components/HomeCard';
import { home_cards_list } from '../constants/DataLists';

const numColumns = 2;

const Home = () => {
  return (
   <View style={styles.container}>
     <FlatList
        data={home_cards_list}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => <HomeCard item={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
