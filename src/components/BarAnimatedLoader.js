import React, { useEffect, useMemo } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BarAnimatedLoader = () => {
    const animValue = useMemo(() => new Animated.Value(0), []);

    // Pre-calculate animated styles
    const bars = [0, 1, 2].map((index) => {
        const inputRange = [
            index - 2,
            index - 1,
            index,
            index + 1,
            index + 2
        ];

        const scaleOutputRange = [1, 1, 1.5, 1, 1];
        const opacityOutputRange = [0.5, 0.5, 1, 0.5, 0.5];

        // Middle bar has different height
        const height = index === 1 ? 35 : 20;
        const marginHorizontal = index === 1 ? 5 : 2;

        return {
            transform: [{
                scaleY: animValue.interpolate({
                    inputRange,
                    outputRange: scaleOutputRange,
                    extrapolate: 'clamp'
                })
            }],
            backgroundColor: animValue.interpolate({
                inputRange,
                outputRange: opacityOutputRange.map(op => `rgba(255,255,255,${op})`),
                extrapolate: 'clamp'
            }),
            height,
            marginHorizontal
        };
    });

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(animValue, {
                toValue: 4, // Matches our input range
                duration: 1200, // Total duration for all bars
                useNativeDriver: true,
            })
        );

        animation.start();

        return () => animation.stop();
    }, [animValue]);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {bars.map((style, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.bar,
                                style,
                                index === 1 && styles.middleBar,
                            ]}
                        />
                    ))}
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
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        width: 5,
        borderRadius: 10,
    },
    middleBar: {},
});

export default React.memo(BarAnimatedLoader);