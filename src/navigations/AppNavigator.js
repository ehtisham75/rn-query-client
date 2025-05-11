import React from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '../configs/Enum';
import colors from '../configs/colors';
import Posts from '../screens/Posts';

const AppStack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
     
        <AppStack.Screen name={screenNames.SETS} component={Posts} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
