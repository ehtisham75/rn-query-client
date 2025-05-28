// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   ActivityIndicator,
//   StyleSheet,
//   InteractionManager,
// } from 'react-native';

// const TestInteractions = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [buttonClicked, setButtonClicked] = useState(false);

//   useEffect(() => {
//     // Delay data loading until all interactions/animations are complete
//     const task = InteractionManager.runAfterInteractions(() => {
//       // Simulate API/data loading
//       setTimeout(() => {
//         setData(['Apple', 'Banana', 'Cherry']);
//         setLoading(false);
//       }, 2000);
//     });

//     // Cleanup if component unmounts early
//     return () => task.cancel();
//   }, []);

//   const handleButtonPress = () => {
//     setButtonClicked(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to the Fruit Store 🍎</Text>

//       <Button title="Touch Me!" onPress={handleButtonPress} />

//       {buttonClicked && <Text style={styles.clicked}>You clicked the button!</Text>}

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//       ) : (
//         <View style={styles.list}>
//           <Text style={styles.dataTitle}>Available Fruits:</Text>
//           {data.map((item, index) => (
//             <Text key={index} style={styles.item}>{item}</Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 20,
//   },
//   clicked: {
//     marginTop: 10,
//     fontSize: 16,
//     color: 'green',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   list: {
//     marginTop: 20,
//   },
//   dataTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginBottom: 8,
//   },
//   item: {
//     fontSize: 16,
//     paddingVertical: 4,
//   },
// });

// export default TestInteractions;











import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  InteractionManager,
  Animated,
  Image
} from 'react-native';

const HeavyUIExample = () => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [buttonScale] = useState(new Animated.Value(1));
  const [headerScroll] = useState(new Animated.Value(0));

  // Simulate heavy data loading
  const loadData = () => {
    setIsLoading(true);
    
    // Run after interactions complete
    InteractionManager.runAfterInteractions(() => {
      // Simulate API call with timeout
      setTimeout(() => {
        // Generate large dataset
        const newData = Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          title: `Item ${i + 1}`,
          description: `This is a detailed description for item ${i + 1}`,
          price: `$${(Math.random() * 100).toFixed(2)}`,
          image: `https://picsum.photos/200/200?random=${i}`
        }));
        
        setData(newData);
        setIsLoading(false);
      }, 2000);
    });
  };

  // Handle button press with animation
  const handlePress = () => {
    // Immediate visual feedback
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
    
    // Load data after animation completes
    InteractionManager.runAfterInteractions(loadData);
  };

  // Handle tab change
  const changeTab = (tab) => {
    setActiveTab(tab);
    setIsLoading(true);
    
    // Simulate content loading for new tab
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  };

  // Header animation on scroll
  const headerHeight = headerScroll.interpolate({
    inputRange: [0, 100],
    outputRange: [150, 70],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={styles.headerText}>Heavy UI Demo</Text>
      </Animated.View>

      {/* Tabs Navigation */}
      <View style={styles.tabs}>
        {['home', 'products', 'profile', 'settings'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => changeTab(tab)}
          >
            <Text style={styles.tabText}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: headerScroll } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Load Data Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.loadButton}
            onPress={handlePress}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Load Heavy Data'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Processing heavy data...</Text>
          </View>
        )}

        {/* Data Grid */}
        {!isLoading && data.length > 0 && (
          <View style={styles.grid}>
            {data.map(item => (
              <View key={item.id} style={styles.card}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {!isLoading && data.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No data loaded yet</Text>
            <Text style={styles.emptySubtext}>
              Press the button above to load heavy data
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#6200ee'
  },
  tabText: {
    color: '#333',
    fontWeight: '600'
  },
  content: {
    flex: 1
  },
  loadButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2
  },
  cardImage: {
    width: '100%',
    height: 120
  },
  cardContent: {
    padding: 10
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  cardPrice: {
    color: '#6200ee',
    fontWeight: 'bold',
    marginVertical: 5
  },
  cardDesc: {
    color: '#666',
    fontSize: 12
  },
  emptyState: {
    padding: 40,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10
  },
  emptySubtext: {
    color: '#666',
    textAlign: 'center'
  }
});

export default HeavyUIExample;