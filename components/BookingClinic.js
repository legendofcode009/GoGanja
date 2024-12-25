import {
  Pressable,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { query, where, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AppointmentCard from "./AppointmentCard.js";
import RecipeCard from "./RecipeCard.js";
import { auth } from "../firebaseConfig";
import Loading from "./Loading.js";

const BookingClinic = () => {
  const navigation = useNavigation();
  const [appointmentTab, setAppointmentTab] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
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
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipes = async () => {
        setLoading(true); // Start loading
        try {
          const authUserId = auth.currentUser.uid; // Replace with actual user ID retrieval logic
          const recipesQuery = query(
            collection(db, "clinics_prescriptions"),
            where("userId", "==", authUserId)
          );
          const snapshot = await getDocs(recipesQuery);
          setRecipes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching recipes: ", error);
        } finally {
          setLoading(false); // End loading
        }
      };
      fetchRecipes();
    }, [])
  );

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "clinics"));
        setClinics(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching clinics: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prevId) => (prevId === id ? null : id));
  };

  const renderAppointmentItem = ({ item }) => (
    <AppointmentCard
      isDropdownOpen={activeDropdownId === item.id}
      toggleDropdown={() => toggleDropdown(item.id)}
      appointment={item}
      clinic = {clinics.find(clinic => clinic.id === item.clinicId)}
    />
  );

  const renderRecipeItem = ({ item }) => (
    <RecipeCard
      recipe={item}
      isDropdownOpen={activeDropdownId === item.id}
      toggleDropdown={() => toggleDropdown(item.id)}
    />
  );

  const removeBooking = (appointmentId) => {
    setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== appointmentId));
  };

  if (loading) {
    return <Loading />
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
          <Pressable style={appointmentTab ? styles.activeSwitch : styles.switch} onPress={() => { setAppointmentTab(true) }} ><Text style={appointmentTab ? styles.activeSwitchText : styles.switchText}>Appointment</Text></Pressable>
          <Pressable style={appointmentTab ? styles.switch : styles.activeSwitch} onPress={() => { setAppointmentTab(false) }}><Text style={appointmentTab ? styles.switchText : styles.activeSwitchText}>Recipes</Text></Pressable>
        </View>
        {
          appointmentTab ?
          <FlatList
            data={bookings}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            style={{ flex: 1, paddingVertical: 5 }}
          /> :
          <FlatList
              data={recipes} // Dummy data for recipes
              renderItem={renderRecipeItem}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => (
                <Pressable style={styles.newPress} onPress={() => navigation.navigate("OrderRecipe")}><Text style={styles.newText}>Order a recipe</Text></Pressable>
              )}
              style={{ flex: 1, paddingVertical: 30 }}
            />  
        }
        {activeDropdownId !== null && (
          <TouchableWithoutFeedback onPress={() => setActiveDropdownId(null)}>
            <View style={styles.dropdownContainer}>
              {/* Render the dropdown here */}
              {/* Ensure dropdown items are interactive */}
            </View>
          </TouchableWithoutFeedback>
        )}
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
    zIndex: 10,
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
