import { View, Text } from 'react-native'
import React from 'react'

const Main = () => {
  return (
    <View style={{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        fontSize:40,
        color:'red'
      }}>Main app here.</Text>
    </View>
  )
}

export default Main