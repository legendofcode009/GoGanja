import React, { useRef, useMemo } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BottomSheetComp = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handlePresentPress = () => {
    bottomSheetRef.current?.expand(); // Expand to 90%
  };

  return (
    <>
      <Button title="Open Bottom Sheet" onPress={handlePresentPress} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start hidden
        snapPoints={snapPoints}
      >
        <View style={styles.content}>
          <Text>Bottom Sheet Content</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
});

export default BottomSheetComp;