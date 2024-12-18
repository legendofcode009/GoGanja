import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Divider, Tooltip } from '@rneui/themed';



const AppointmentCard = ({ isDropdownOpen, toggleDropdown }) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const handleOptionPress = (action) => {
    switch (action) {
      case 'cancel':
        // Handle cancel logic
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
    <View style={styles.card}>
      <Pressable style={styles.headContainer} onPress={() => navigation.navigate("AppointmentDetail")}><Text style={styles.headText}>Name Procedure</Text><Text style={styles.timeText}>20 May 2024 - 12:00</Text></Pressable>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/Clinic.jpg')}
            style={styles.image}
          // onPress = {() => {navigation.navigete("Clinic")}}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.bgText}>Name Clinic</Text>
          <Text style={styles.smText}>20 May 2024 12:00</Text>
          <Text style={styles.smText}>Price</Text>
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
              <Text>Cancel Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('change')}
            >
              <Text>Change Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('share')}
            >
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Divider />
      <View style={styles.agianContainer}>
        <Text style={styles.againText}><Ionicons size={24} color={"#DEBA5C"} name="sync" />   Make an appointment again</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },

  dropdown: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  threeDot: {
    position: "absolute",
    right: 20,
    top: 8,
    zIndex: 1000, // Add this
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
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
    width: "100%",
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
  agianContainer: {
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