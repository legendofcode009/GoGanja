import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { ModalPortal } from 'react-native-modals';
import store from './store';
import { Provider } from 'react-redux';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
  <>
  <Provider store={store}>
  <StackNavigator />
  <ModalPortal />
  </Provider>
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
});
