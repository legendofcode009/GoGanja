import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import ClinicCard from "../components/ClinicCard.js"
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import PageHeader from "../components/PageHeader.js";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const searchPlaces = (place) => {
    if (!route.params || !selectedDates) {
        Alert.alert(
          "Invalid details", 
          "Please enter all the details", 
          [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        {cancelable: false}
        );
    }
    if(route.params && selectedDates ) {
      navigation.navigate("Places",{
        rooms:rooms,
        adults:adults,
        children:children,
        selectedDates:selectedDates,
        place:place,
      })
    }
  };


  return (
    <>
    
      <View style = {styles.pgcontainer}>
        <ScrollView style = {{paddingBottom : 70,}}>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
            }}
          >
            {/* Destination */}
            <TextInput
                placeholderTextColor="black"
                placeholder="Search Clinic"
                style = {{
                  display: "flex",
                  height: 48,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#cecece",
                  paddingHorizontal: 40,
                  flexGrow: 1
                }}
                onEndEditing={() => navigation.navigate("Search")}
            >
            </TextInput><Feather name="search" size={20} color="#808080" style = {{position: "absolute", left: 15, top: 15}} />
            <Pressable
              onPress={() => navigation.navigate("Filter")}
              raised
              style={{
                width: 48,
                height: 48,
                borderRadius: 48,
                borderColor: "#cecece",
                borderWidth: 1,
                marginLeft: 16,
                alignItems:"center",
                justifyContent: "center",
              }}
            >
              <Image style={{width:24, height:24}} source={require('../assets/mage_filter.png')} />
            </Pressable>
          </View>

        <ClinicCard /> 
        <ClinicCard /> 
        <ClinicCard /> 

        <View 
          style={{
            marginHorizontal: 20,
            marginBottom : 165,
            borderWidth: 1,
            borderColor: "#CECECE",
            paddingHorizontal: 24,
            paddingVertical : 16,
            flexDirection: "row",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <View style = {{ flexShrink: 1}}>
            <Text style = {{  fontSize: 18, fontWeight: 500, width: '100%' }}>Prescription management</Text>
            <Text style = {{  fontSize: 14, width: '100%' }}>Leave a request and get a recipe easily and quickly</Text>
          </View>
          <View style = {{width:10, }}></View>
          <View >
            <Pressable onPress={() => navigation.navigate("Choice")} style = {{ width:40, height:40, borderRadius:40, backgroundColor:"#314435", alignItems:"center", justifyContent: "center" }}>
              <AntDesign name="arrowright" size = {24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
        </ScrollView>
      </View>

    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pgcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    flexDirection: "column",
  },
});
