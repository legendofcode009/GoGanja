import React, {useState, useCallback } from "react";
import {Text, View, StyleSheet, Image, Pressable} from "react-native";



const SelectLocation = () =>{

    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        { name: 'Any Location' },
        { name: 'Bangkok', },
        { name: 'Pattaya'},
        { name: 'Ko Samui'},
        { name: 'Phuket' },
        { name: 'Chiang Mai' },
    ]; 

    const handlePress = useCallback((index) => {
        // Toggle the active section with a functional update
        //console.log(index);
        setActiveSection((prevActiveSection) => 
            prevActiveSection === index ? null : index
        );
    }, []);

    return(
        <View style = {styles.container} >
            {sections.map((item, index) => (
                
                <Pressable key = {index} onPress={() => handlePress(index)} style = {activeSection === index ? styles.activeChip : styles.chip}>
                        <Text style = {activeSection === index ? styles.activeLocationText : styles.locationText}>{item.name}</Text>                
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        justifyContent: "space-around",
        flexDirection: "row",
        width: "100%",
        borderWidth: 0,
    },
    chip: {
        width: "45%",
        height: 35,
        margin: 8,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#DEBA5C",
        borderWidth: 1,
    },
    activeChip: {
        width: "45%",
        height: 35,
        margin: 8,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#DEBA5C",
        backgroundColor: "#DEBA5C",
    },
    locationText: {
        fontSize: 14,
        fontWeight: "600",
    },
    activeLocationText: {
        fontSize: 14 ,
        fontWeight: "600",
        color: "#fafafa"
    }
})



export default SelectLocation;