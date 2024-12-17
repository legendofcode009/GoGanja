import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { Icon } from "@rneui/themed";

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
      <View style = {styles.topcontainer}>
        <Text style = {styles.header}>Search Result</Text>
        <View
            style={{
              marginTop: 5,
              marginHorizontal: 25,
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
                onEndEditing={() => navigation.navigate("")}
            >
              
            </TextInput>
            <Feather name="arrow-left" size={20} color="#808080" style = {{position: "absolute", left: 15, top: 15}} onPress={() => navigation.navigate("Main")} />
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
      </View>
    
      <SafeAreaView style = {styles.pgcontainer}>
        <ScrollView style = {{paddingVertical : 20, flex: 1 }} contentContainerStyle={{ paddingBottom: 150 }}>
          

        <ClinicCard /> 
        <ClinicCard /> 
        <ClinicCard /> 

        </ScrollView>
      </SafeAreaView>

    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "600",
  },
  topcontainer: {
    alignItems: "center",
    height: 130,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomColor: '#cecece',
    backgroundColor: "#fafafa",
    borderBottomWidth: 2,
    elevation:5,
  },
  pgcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    flexDirection: "column",
  },
});