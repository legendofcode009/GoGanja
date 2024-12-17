import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Text, Divider, CheckBox  } from '@rneui/themed';
import { Ionicons } from "@expo/vector-icons";


const ChoiceScreen = () => {
    navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "Make your choice",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "medium",
            color: "#314435",
          },
          headerStyle: {
            backgroundColor: "#FAFAFA",
            height: 78,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },
    
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={12.8}
              color="#090A09"
              style={{ marginRight: 24 }}
            />
          ),
        });
      }, []);

    return(
        <View style = {styles.pgcontainer} >
            <View style = {styles.container}>
                <Text style = {styles.left}>Location</Text>
                <Text style = {styles.right}>Any location</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.left}>Location</Text>
                <Text style = {styles.right}>Any location</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.left}>Location</Text>
                <Text style = {styles.right}>Any location</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Clear all</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}>
                    <Text style={styles.buttonText1}>Show results</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}


styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 16,
        justifyContent: "space-around",
        shadowColor: '#999999',
        height: 60,
        marginBottom: 16,
        shadowOffset: { width: 5, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
    },
    left: {
        fontSize: 16,
        color: "#808080",
    },
    right: {
        fontSize: 16,
        color: "#090A09",
    },  
    pgcontainer: {
        height:"100%",
        width: "100%",
        padding: 20,
        backgroundColor: '#fafafa',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
        marginTop: 30,
        marginHorizontal: 20,
      },
      button: {
        width:168,
        height: 48,
        borderColor: "#314435",
        borderWidth:1,
        borderRadius: 16,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      },
      buttonText: {
        fontSize: 16,
        color: "#314435"
      },
      button1: {
        width:168,
        height: 48,
        backgroundColor: "#314435",
        borderWidth:1,
        borderRadius: 16,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      },
      buttonText1: {
        fontSize: 16,
        color: "#fafafa"
      },
})

export default ChoiceScreen