import React, {useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import { CheckBox } from "@rneui/base";



const SelectCondition = ({activeSection, setActiveSection}) =>{

    const conditions = [
        'Any direction',
        'Chronic Pain',
        'Multiple Sclerosis',
        'Neuropathic pain',
        'Post-traumatic stress disorder',
        'Cancer related symptoms',
        "Irritable bowel syndrome (IBS)",
        "Endometriosis",
        "Menstrual Cramps",
        "Migraine",
        "Fibromyalgia",
        "Chronic Fatigue Syndrome",
        "Arthritis",
    ];

    const toggleCondition = (condition) => {
        if(condition === 'Any direction'){
            setActiveSection(["Any direction"]);
        }else{
            setActiveSection((prev) => prev.filter((s) => s !== 'Any direction'));
            setActiveSection((prev) =>
                prev.includes(condition) ? prev.filter((s) => s !== condition) : [...prev, condition]
            );
        }
      };

    return(
        <View>
            {conditions.map((condition, index) => (
            <Pressable key={index} style={styles.checkboxContainer} onPress={() => toggleCondition(condition)}>
                <Text style={styles.checkboxLabel}>{condition}</Text>
                <CheckBox
                    containerStyle = {{padding:0, margin:0, right:0}}
                    checked = {activeSection.includes(condition)}
                    checkedColor="#DEBA5C"
                    uncheckedColor='#DEBA5C'
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    size = {24}
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
        height: 46,
        padding: 8,
      },
      checkboxLabel: {
        fontSize: 16,
        flexGrow: 1,
        fontFamily: "Lato_400Regular",
      },
})


export default SelectCondition;