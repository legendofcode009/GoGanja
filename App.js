import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import StackNavigator from './StackNavigator';
import { ModalPortal } from 'react-native-modals';
import store from './store';
import { Provider } from 'react-redux';
import React from 'react';
import { 
  useFonts, 
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic, } from '@expo-google-fonts/lato';
  import {
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  } from '@expo-google-fonts/pt-sans';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
    PTSans_400Regular,
    PTSans_400Regular_Italic,
    PTSans_700Bold,
    PTSans_700Bold_Italic,
  });

  // Add animation value
  const [animation] = React.useState(new Animated.Value(0));
  const [isAppReady, setIsAppReady] = React.useState(false);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      // Start fade out animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsAppReady(true);
        SplashScreen.hideAsync();
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.splashContainer}>
        <Image 
          source={require('./assets/Logo.png')}
          style={styles.splashImage}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {!isAppReady && (
        <Animated.View 
          style={[
            styles.splashContainer, 
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }
          ]}
        >
          <Image 
            source={require('./assets/Logo.png')}
            style={styles.splashImage}
          />
          <Text style={styles.splashText}>Your App Name</Text>
        </Animated.View>
      )}
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <StackNavigator />
          <ModalPortal />
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff', // Or your preferred background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  splashText: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: 'Lato_400Regular',
  },
});
