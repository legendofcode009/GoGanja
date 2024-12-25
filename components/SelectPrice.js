import React, { useState, useCallback, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import RangeSlider from 'rn-range-slider';

const Thumb = () => (
  <View style={styles.thumb} />
);

const Rail = () => (
  <View style={styles.rail} />
);

const RailSelected = () => (
  <View style={styles.railSelected} />
);

const Label = ({ text }) => (
  <View style={styles.labelContainer}>
    <Text style={styles.labelText}>${text}</Text>
  </View>
);

const Notch = () => (
  <View style={styles.notch} />
);

const PriceDistribution = ({ clinics, max }) => {
  // Create bins for every $1 interval
  const bins = useMemo(() => {
    const distribution = new Array(Math.ceil(max)).fill(0);
    clinics.forEach(clinic => {
      const binIndex = Math.floor(clinic.initialConsultFee);
      if (binIndex < distribution.length) {
        distribution[binIndex]++;
      }
    });
    // Find maximum count for scaling
    const maxCount = Math.max(...distribution);
    return distribution.map(count => (count / maxCount) * 50); // Scale height to max 50
  }, [clinics, max]);

  return (
    <View style={styles.distributionContainer}>
      {bins.map((height, index) => (
        <View
          key={index}
          style={[
            styles.distributionBar,
            { height: height || 0 }
          ]}
        />
      ))}
    </View>
  );
};

const SelectPrice = ({ price, setPrice, clinics }) => {
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(50);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
        setPrice({ low, high });
    }, []);

    return (
        <>
            <Text style={styles.under}>Choose the desired price</Text>
            <PriceDistribution clinics={clinics} max={50} />
            <RangeSlider
                style={styles.slider}
                min={0}
                max={50}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChange}
            />
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}>
                <View style={styles.roundbox}><Text>${low}</Text></View>
                <View style={styles.roundbox}><Text>${high}</Text></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    under: {
        fontSize: 14,
        color: "#808080",
    },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 10,
    },
    // Add these new styles for the slider components
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#DEBA5C',
        backgroundColor: '#fafafa',
    },
    rail: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E4E4E4',
    },
    railSelected: {
        height: 4,
        backgroundColor: '#DEBA5C',
        borderRadius: 2,
    },
    labelContainer: {
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#DEBA5C',
        borderRadius: 4,
    },
    labelText: {
        fontSize: 12,
        color: '#fff',
    },
    notch: {
        width: 8,
        height: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#DEBA5C',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
    },
    roundbox: {
        height: 35,
        width: 150,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#B1D5B9",
        alignItems: "center",
        justifyContent: "center",
    },
    distributionContainer: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingHorizontal: 12, // Account for thumb width
        marginBottom: 8,
    },
    distributionBar: {
        flex: 1,
        backgroundColor: '#DEBA5C',
        marginHorizontal: 1,
        minHeight: 1,
    },
})

export default SelectPrice;