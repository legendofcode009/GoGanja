import {
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AppointmentCard from "./AppointmentCard.js";
import RecipeCard from "./RecipeCard.js";
import { auth } from "../firebaseConfig";

const BookingClinic = () => {
  const navigation = useNavigation();
  const [appointment, setAppointment] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true); // Start loading
      try {
        const authUserId = auth.currentUser.uid; // Replace with actual user ID retrieval logic
        const bookingsQuery = query(
          collection(db, "clinics_bookings"),
          where("userId", "==", authUserId)
        );
        const snapshot = await getDocs(bookingsQuery);
        setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchBookings();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const renderAppointmentItem = ({ item }) => (
    <AppointmentCard
      isDropdownOpen={activeDropdownId === item.id}
      toggleDropdown={() => toggleDropdown(item.id)}
      appointment={item}
    />
  );

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }

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
          <FlatList
            data={bookings}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 70 }}
          /> :
          <FlatList
              data={[1, 2, 3]} // Dummy data for recipes
              renderItem={() => (
                <RecipeCard />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={() => (
                <Pressable style={styles.newPress} onPress={() => navigation.navigate("OrderRecipe")}><Text style={styles.newText}>Order a recipe</Text></Pressable>
              )}
              contentContainerStyle={{ paddingBottom: 70 }}
            />  
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
