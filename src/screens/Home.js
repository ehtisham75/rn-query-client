import React from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import HomeCard from '../components/HomeCard';

const numColumns = 2;

const Home = () => {
  return (
   <View style={styles.container}>
     
     <FlatList
        data={data}
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
