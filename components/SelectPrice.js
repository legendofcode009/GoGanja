import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import RangeSlider from 'rn-range-slider';

// Add these custom components
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

const SelectPrice = () => {
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(1000);

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    return (
        <>
            <Text style={styles.under}>Choose the desired price</Text>
            <RangeSlider
                style={styles.slider}
                min={0}
                max={1000}
                step={10}
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
})

export default SelectPrice;