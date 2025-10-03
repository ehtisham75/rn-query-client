
import React, { useRef, useEffect, useMemo } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Easing,
} from 'react-native';

// Constant segment setup
const spinnerSegments = [
    { color: '#6359f8', angle: 0 },
    { color: '#f36896', angle: 90 },
    { color: '#ff0b0b', angle: 180 },
    { color: '#ffb700', angle: 270 },
];

const AnimatedSpinner = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1600, // Slower, smoother rotation
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            })
        );
        animation.start();
        return () => animation.stop();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const renderedSegments = useMemo(() =>
        spinnerSegments.map((segment, index) => (
            <View
                key={index}
                style={[
                    styles.segment,
                    {
                        backgroundColor: segment.color,
                        shadowColor: segment.color,
                        transform: [
                            { rotate: `${segment.angle}deg` },
                            { translateY: -28 },
                        ],
                    },
                ]}
            />
        )), []
    );

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>

                <View style={styles.wrapper}>
                    <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
                        {renderedSegments}
                        {/* <View style={styles.innerCircle} /> */}
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
      outerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    segment: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
    },
    innerCircle: {
        width: 22,
        height: 22,
        backgroundColor: '#222',
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#444',
    },
});

export default React.memo(AnimatedSpinner);












// import React, { useRef, useEffect, useMemo } from 'react';
// import { View, Animated, StyleSheet, Easing } from 'react-native';

// const spinnerSegments = [
//   { color: '#6359f8', angle: 0 },
//   { color: '#f36896', angle: 90 },
//   { color: '#ff0b0b', angle: 180 },
//   { color: '#ffb700', angle: 270 },
// ];

// const PremiumLoader = () => {
//   const rotateAnim = useRef(new Animated.Value(0)).current;
//   const animationRef = useRef(null);

//   const spin = useMemo(() => 
//     rotateAnim.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '360deg'],
//     }), 
//     [rotateAnim]
//   );

//   useEffect(() => {
//     animationRef.current = Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 1200, // Slower duration for smoother appearance
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     ).start();

//     return () => animationRef.current?.stop();
//   }, []);

//   const renderedSegments = useMemo(() => 
//     spinnerSegments.map((segment, index) => {
//       // Create gradient effect between segments
//       const nextColor = spinnerSegments[(index + 1) % spinnerSegments.length].color;
//       return (
//         <Animated.View
//           key={index}
//           style={[
//             styles.segment,
//             {
//               backgroundColor: segment.color,
//               shadowColor: nextColor, // Use next color for shadow to create blend
//               transform: [
//                 { rotate: `${segment.angle}deg` }, 
//                 { translateY: -30 },
//                 { scale: rotateAnim.interpolate({
//                   inputRange: [0, 0.5, 1],
//                   outputRange: [1, 1.1, 1],
//                   extrapolate: 'clamp'
//                 })}
//               ],
//             },
//           ]}
//         />
//       );
//     }),
//     []
//   );

//   return (
//     <View style={styles.wrapper}>
//       <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
//         {renderedSegments}
//         <View style={styles.innerCircle} />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   spinner: {
//     width: 100, // Slightly larger for smoother motion
//     height: 100,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   segment: {
//     position: 'absolute',
//     width: 50,
//     height: 20, // More streamlined shape
//     borderRadius: 25, // More pill-shaped
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.9,
//     shadowRadius: 8, // Softer shadow
//     elevation: 8,
//   },
//   innerCircle: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#222',
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#444',
//   },
// });

// export default React.memo(PremiumLoader);