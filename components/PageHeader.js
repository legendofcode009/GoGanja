import { Pressable, Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PageHeader = ({text}) => {
  const navigation = useNavigation();
  return (
    <View style = {styles.headerContainer}>
        <Text style={styles.headerText}>{text}</Text>
        <Ionicons name = "close" style = {styles.icon} size = {24} onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 30,
        height:100, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA", 
        marginBottom: 3,
        elevation: 2,
        borderBottomRightRadius:24,
        borderBottomLeftRadius: 24, 
    },
    
    headerText: {
      fontSize: 20,
      fontWeight: "600",
    },
    icon: {
      position: "absolute",
      top: 50,
      right:30,
    }
  });
  

export default PageHeader;
