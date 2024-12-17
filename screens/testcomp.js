import React, { useRef, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const MyComponent = () => {
  const sheetRef = useRef(null);

  // Define the snap points
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button 
        title="Appointment" 
        onPress={() => sheetRef.current?.expand()} 
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1} // Start closed
        enablePanDownToClose={true} // Allow swipe down to close
      >
        <BottomSheetView style={styles.content}>
          <Text>Awesome 🔥</Text>
          {/* Include other components or content here */}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;