import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import {Entypo, Ionicons} from "@expo/vector-icons"
import { Divider } from '@rneui/themed';



const AppointmentCard = () => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  }
  return (
    <View style={styles.card}>
        <Pressable style = {styles.headContainer} onPress={() => navigation.navigate("AppointmentDetail")}><Text style = {styles.headText}>Name Procedure</Text><Text style = {styles.timeText}>20 May 2024 - 12:00</Text></Pressable>
        <View style = {styles.rowContainer}>
            <View style = {styles.imageContainer}>
                <Image
                    source={require('../assets/Clinic.jpg')}
                    style={styles.image}
                    // onPress = {() => {navigation.navigete("Clinic")}}
                />
            </View>
            <View style = {styles.contentContainer}>
                <Text style = {styles.bgText}>Name Clinic</Text>
                <Text style = {styles.smText}>20 May 2024 12:00</Text>
                <Text style = {styles.smText}>Price</Text>
            </View>
            <Entypo style = {styles.threeDot} name = "dots-three-vertical" size={16} />
        </View>
        <Divider />
        <View style = {styles.agianContainer}>
            <Text style = {styles.againText}><Ionicons size={24} color={"#DEBA5C"} name = "sync" />   Make an appointment again</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: "#fafafa",
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headContainer: {
    padding: 8,
    gap: 8,
    borderWidth: 0,
  },
  headText: {
    fontSize: 18,
    fontWeight: "500",
  },
  timeText: {
    fontSize: 16,
    color: "#808080",
  },
  rowContainer: {
    flexDirection: "row",
    height: 113,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width:"100%",
    height: "100%", // Set a height for the image
    resizeMode: 'cover', // Optional: adjust how the image resizes
  },
  contentContainer: {
    marginLeft: 16,
  },
  bgText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  smText: {
    fontSize: 14,
  },
  threeDot: {
    position: "absolute",
    right: 20,
    top: 8,
  },
  agianContainer:{
    height: 43,
    padding: 8,
    alignItems: "center"
  },
  againText: {
    fontSize: 16,
    color: "#DEBA5C",
  }
});

export default AppointmentCard;