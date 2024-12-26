import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';   

const Loading = () => {
    const fadeAnim = useRef(new Animated.Value(0.3)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0.3,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 0.95,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require('../assets/GoGanjaLogoGold.png')} 
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]} 
            />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 400,
        height: 200,
    },
    loadingText: {
        fontSize: 22,
        color: '#666',
        //fontFamily: "PTSans_700Bold",
        fontFamily: "Lato_700Bold",
    }
});

export default Loading;