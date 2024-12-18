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
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <View style={styles.pgContainer}>
        {activeDropdownId !== null && (
          <Pressable
            style={styles.pageOverlay}
            onPress={() => setActiveDropdownId(null)}
          />
        )}
        <View style={styles.switchContainer}>
          <Pressable style={appointment ? styles.activeSwitch : styles.switch} onPress={() => { setAppointment(true) }} ><Text style={appointment ? styles.activeSwitchText : styles.switchText}>Appointment</Text></Pressable>
          <Pressable style={appointment ? styles.switch : styles.activeSwitch} onPress={() => { setAppointment(false) }}><Text style={appointment ? styles.switchText : styles.activeSwitchText}>Recipes</Text></Pressable>
        </View>
        {
          appointment ?
            <ScrollView style={{ paddingBottom: 70 }}>
              <AppointmentCard
                isDropdownOpen={activeDropdownId === 1}
                toggleDropdown={() => toggleDropdown(1)}
              />
              <AppointmentCard
                isDropdownOpen={activeDropdownId === 2}
                toggleDropdown={() => toggleDropdown(2)}
              />
            </ScrollView> :
            <ScrollView style={{ paddingBottom: 70 }}>
              <Pressable style={styles.newPress} onPress={() => navigation.navigate("OrderRecipe")}><Text style={styles.newText}>Order a recipe</Text></Pressable>
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
    flex: 1,
    backgroundColor: "#fafafa",
    flexDirection: "column",
  },
  pageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 998,
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
    margin: 20,
  },
  newText: {
    color: "#fafafa",
    fontSize: 20,
    fontWeight: "500",
  }
});
