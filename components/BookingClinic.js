import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
import AppointmentCard from "./AppointmentCard.js";
import RecipeCard from "./RecipeCard.js";
  
  const BookingClinic = () => {
    const navigation = useNavigation();
    const [appointment, setAppointment] = useState(true);
  
    return (
      <>
        <View style = {styles.pgContainer}>
          <View style = {styles.switchContainer}>
            <Pressable style = {appointment?styles.activeSwitch:styles.switch} onPress={() => {setAppointment(true)}} ><Text style = {appointment?styles.activeSwitchText:styles.switchText}>Appointment</Text></Pressable>
            <Pressable style = {appointment?styles.switch:styles.activeSwitch} onPress={() => {setAppointment(false)}}><Text style = {appointment?styles.switchText:styles.activeSwitchText}>Recipes</Text></Pressable>
          </View>
          {
            appointment?
            <ScrollView style = {{paddingBottom : 70}}>
                <AppointmentCard />
                <AppointmentCard />
                <AppointmentCard />
                <AppointmentCard />
                <AppointmentCard />
            </ScrollView>:
            <ScrollView style = {{paddingBottom : 70}}>
              <Pressable style = {styles.newPress} onPress={() => navigation.navigate("OrderRecipe")}><Text style = {styles.newText}>Order a recipe</Text></Pressable>
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
          </ScrollView>
          }
          
        </View>
  
      </>
    );
  };
  
  export default BookingClinic;
  
  const styles = StyleSheet.create({
    pgContainer: {
      width: "100%",
      height: "100%",
      backgroundColor: "#fafafa",
      flexDirection: "column",
    },
    switchContainer: {
      marginTop: 24,
      marginBottom: 16,
      paddingHorizontal: 20,
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    activeSwitch: {
      width: "45%",
      height: 40,
      backgroundColor: "#DEBA5C",
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
    },
    switch: {
      width: "45%",
      height: 40,
      backgroundColor: "#fafafa",
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
    },
    activeSwitchText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fafafa"
    },
    switchText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#131313"
    },
    newPress: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#314435",
      borderRadius: 16,
      elevation: 2,
      margin : 20,
    },
    newText: {
      color: "#fafafa",
      fontSize: 20,
      fontWeight: "500",
    }
  });
  