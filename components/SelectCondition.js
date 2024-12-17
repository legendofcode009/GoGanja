import React, {useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import { CheckBox } from "@rneui/base";



const SelectCondition = () =>{
    
    const [selectedConditions, setSelectedConditions] = useState([0]);
    const conditions = [
        'Any direction',
        'Chronic Pain',
        'Multiple Sclerosis',
        'Neuropathic pain',
        'Post-traumatic stress disorder',
        'Cancer related symptoms',
        'Any direction',
        'Chronic Pain',
        'Multiple Sclerosis',
        'Neuropathic pain',
        'Post-traumatic stress disorder',
        'Cancer related symptoms',
        'Consultation rooms',
        'Medical evaluation',
        'Education services',
        'Cannabis prescriptions',
        'Dispensary services',
        'Telemedicine services',
    ];

    const toggleCondition = (index) => {
        setSelectedConditions((prev) =>
          prev.includes(index) ? prev.filter((s) => s !== index) : [...prev, index]
        );
    };

    return(
        <View>
            {conditions.map((condition, index) => (
            <Pressable key={index} style={styles.checkboxContainer} onPress={() => toggleCondition(index)}>
                <Text style={{fontSize:16, flexGrow:1}}>{condition}</Text>
                <CheckBox
                containerStyle = {{padding:0, margin:0, right:0}}
                checked={selectedConditions.includes(index)}
                checkedColor="red"
                uncheckedColor='#DEBA5C'
                size = {24}
                iconRight
                />
            </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        marginTop: 16,
      },
      checkboxLabel: {
        fontSize: 16,
        color: "red",
      },
})


export default SelectCondition;