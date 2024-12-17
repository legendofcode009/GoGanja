import React from "react";
import {Text, View, StyleSheet} from "react-native";
import { Slider  } from '@rneui/themed';


const SelectPrice = () =>{
    return(
        <>
            <Text style={styles.under}>Choose the desired price</Text>
            <Slider
                maximumValue={1000}
                minimumValue={0}
                step={1}
                allowTouchTrack
                trackStyle={{ height: 4, backgroundColor: '#DEBA5C', }}
                thumbStyle={{ height: 16, width: 16, backgroundColor:  '#fafafa', borderColor: "#DEBA5C" }}
            />
            <View style = {{flexDirection: "row", justifyContent: "center", alignItems:"center", gap: 20}}>
                <View style = {styles.roundbox}><Text>$0</Text></View>
                <View style = {styles.roundbox}><Text>$1000</Text></View>
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
      priceText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: "600",
        color: "#090A09",
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