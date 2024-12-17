import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const tabs = ["Hotel", "Tours", "Clinic"];

const BookingHeader = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    onTabChange(selectedTab); // Notify parent about the selected tab
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <View style={styles.pageheadercontainer}>
        <Text style={styles.headertext}>Booking</Text>
        <Ionicons size={16} style={styles.headericon} name = "search" />
      </View>
      <View style={styles.headerContainer}>
        {tabs.map((tab, idx) => (
          <Pressable
            style={[styles.headerItem, selectedTab === idx ? styles.headerItemSelected : {}]}
            key={`header-tab-${idx}`}
            onPress={() => setSelectedTab(idx)}
          >
            <Text style={selectedTab !== idx ? styles.headerItemText : styles.headerItemSelectedText}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BookingHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fafafa",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  pageheadercontainer: {
    height: 100,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headertext: {
    fontSize: 20,
    color: "#314435",
    fontWeight: "500",
  },
  headericon: {
    width: 16,
    height: 16,
    zIndex: 3,
    position: "absolute",
    right: 40,
    top: 60,
  },
  headerContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 2,
  },
  headerItem: {
    color: '#090A09',
    fontSize: 16,
    width: 80,
    height: 30,
    textAlign: 'center'
  },
  headerItemText: {
    fontSize: 16,
    textAlign: 'center'
  },
  headerItemSelected: {
    borderBottomColor: '#DEBA5C',
    borderBottomWidth: 2
  },
  headerItemSelectedText: {
    color: '#DEBA5C',
    fontSize: 16,
    textAlign: 'center'
  }
});