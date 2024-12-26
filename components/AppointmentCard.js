import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Divider, Tooltip } from '@rneui/themed';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';



const AppointmentCard = ({ isDropdownOpen, toggleDropdown, appointment, clinic }) => {
  const navigation = useNavigation();

  const handleOptionPress = (action) => {
      switch (action) {
        case 'cancel':
          removeBooking(appointment.id);
          break;
        case 'change':
        // Handle change logic
          break;
        case 'share':
        // Handle share logic
          break;
      }
    toggleDropdown(false);
  };


  return (
    <View style={styles.card}>{console.log(appointment.selectedServices)}
      <Pressable style={styles.headContainer} onPress={() => navigation.navigate("AppointmentDetail", { appointmentId: appointment.id, clinicId: clinic.id })}>
        <Text style={styles.headText}>Name Procedure</Text>
        <Text style={styles.timeText}>{appointment?.id ? new Date(appointment.createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', ' -') : ''}</Text>
      </Pressable>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={clinic?.featuredImage ? { uri: clinic.featuredImage } : require('../assets/Clinic.jpg')}
            style={styles.image}
          // onPress = {() => {navigation.navigete("Clinic")}}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.bgText}>{clinic?.name}</Text>
          <Text style={styles.smText}>{appointment?.id ? new Date(appointment.bookedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', ' -') : ''}
          </Text>
          <Text style={styles.smText}>{appointment?.totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.threeDot}
          onPress={() => toggleDropdown(!isDropdownOpen)}
        >
          <Entypo name="dots-three-vertical" size={16} />
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('cancel')}
            >
              <Text style={styles.dropdownItemText}>Cancel Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('change')}
            >
              <Text style={styles.dropdownItemText}>Change Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('share')}
            >
              <Text style={styles.dropdownItemText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Divider />
      <View style={styles.againContainer}>
        <Text style={styles.againText}>
          <Ionicons size={24} color={"#DEBA5C"} name="sync" /> Make an
          appointment again
        </Text>
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
    padding: 15,
    gap: 8,
    borderWidth: 0,
  },
  headText: {
    fontSize: 18,
    fontFamily: "Lato_700Bold",
  },
  timeText: {
    fontSize: 16,
    color: "#808080",
    fontFamily: "Lato_400Regular",
  },
  rowContainer: {
    flexDirection: "row",
    height: 113,
    paddingVertical: 12,
    paddingHorizontal: 8,
    position: "relative",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  contentContainer: {
    marginLeft: 16,
  },
  bgText: {
    fontSize: 16,
    fontFamily: "Lato_700Bold",
    marginBottom: 8,
  },
  smText: {
    fontSize: 14,
    marginVertical: 2,
    fontFamily: "Lato_400Regular",
  },
  threeDot: {
    position: "absolute",
    right: 20,
    top: 8,
    zIndex: 1000,
  },
  dropdown: {
    position: "absolute",
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    top: 8,
    zIndex: 3000,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  againContainer: {
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  againText: {
    fontSize: 16,
    color: "#DEBA5C",
    fontFamily: "Lato_700Bold",
  },
  dropdownItemText: {
    fontFamily: "Lato_400Regular",
  }

})

export default AppointmentCard;