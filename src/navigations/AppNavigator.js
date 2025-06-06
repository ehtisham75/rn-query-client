import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from '../screens/Posts';
import ScreenNames from '../constants/ScreenNames';
import Home from '../screens/Home';
import CreatePosts from '../screens/CreatePosts';
import TestInteractions from '../screens/TestInteractions';

const AppStack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>

        <AppStack.Screen name={ScreenNames.home} component={Home} />
        <AppStack.Screen name={ScreenNames.posts} component={Posts} />
        <AppStack.Screen name={ScreenNames.createPosts} component={CreatePosts} />
        <AppStack.Screen name={ScreenNames.interactions} component={TestInteractions} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
