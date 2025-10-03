import React, { useRef, useState } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  View,
} from 'react-native';

const AnimatedButton = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{ scale }],
              shadowOpacity: isPressed ? 0.3 : 0.4,
              shadowOffset: isPressed
                ? { width: 0, height: 1 }
                : { width: 0, height: 4 },
              shadowRadius: isPressed ? 3 : 6,
            },
          ]}
        >
          <Text style={styles.buttonText}>Happy Coding!</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#536DFE',
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#536DFE',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#536DFE',
    fontSize: 20,
    fontFamily: 'JetBrainsMono-Regular',
  },
});

export default AnimatedButton;