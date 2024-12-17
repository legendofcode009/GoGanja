import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, Entypo } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import BookingScreen from "./screens/BookingScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import {StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/SearchScreen";
import PlacesScreen from "./screens/PlacesScreen";
import MapScreen from "./screens/MapScreen";
import PropertyInfoScreen from "./screens/PropertyInfoScreen";
import RoomsScreen from "./screens/RoomsScreen";
import UserScreen from "./screens/UserScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FiltersScreen from "./screens/FiltersScreen";
import ChoiceScreen from "./screens/ChoiceScreen";
import ClinicScreen from "./screens/ClinicScreen";
import ScheduleClinic from "./screens/ScheduleClinic";
import ScheduleClinic2 from "./screens/ScheduleClinic2";
import ScheduleClinic3 from "./screens/ScheduleClinic3";
import Main from "./screens/Main";
import Profile from "./screens/Profile";
import AppointmentDetail from "./screens/AppointmentDetail";
import RecipeDetail from "./screens/RecipeDetail";
import OrderRecipe from "./screens/OrderRecipe";
import OrderConfirmation from "./screens/OrderConfirmation";
import PaymentFailed from "./screens/PaymentFailed";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarActiveTintColor: '#DEBA5C',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="#DEBA5C" />
            ) : (
              <Ionicons name="home-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: "Favourite",
          headerShown: false,
          tabBarActiveTintColor: '#DEBA5C',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={24} color="#DEBA5C" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingScreen}
        options={{
          tabBarLabel: "Bookings",
          headerShown: false,
          tabBarActiveTintColor: '#DEBA5C',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="calendar" size={24} color="#DEBA5C" />
            ) : (
              <Ionicons name="calendar-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={BookingScreen}
        options={{
          tabBarLabel: "Message",
          headerShown: false,
          tabBarActiveTintColor: '#DEBA5C',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbox-ellipses" size={24} color="#DEBA5C" />
            ) : (
              <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarActiveTintColor: '#DEBA5C',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#DEBA5C" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown:false }} />
        <Stack.Screen name="Filter" component={FiltersScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Clinic" component={ClinicScreen} options={{headerShown:false}} />
        <Stack.Screen name="ScheduleClinic" component={ScheduleClinic} options={{headerShown:false}} />
        <Stack.Screen name="ScheduleClinic2" component= {ScheduleClinic2} options={{headerShown:false}} />
        <Stack.Screen name="ScheduleClinic3" component= {ScheduleClinic3} options={{headerShown:false}} />
        <Stack.Screen name="AppointmentDetail" component= {AppointmentDetail} options={{headerShown:false}} />
        <Stack.Screen name="RecipeDetail" component= {RecipeDetail} options={{headerShown:false}} />
        <Stack.Screen name="OrderRecipe" component= {OrderRecipe} options={{headerShown:false}} />
        <Stack.Screen name="OrderConfirmation" component= {OrderConfirmation} options={{headerShown:false}} />
        <Stack.Screen name="PaymentFailed" component= {PaymentFailed} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
