import { Pressable, Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const navigation = useNavigation();
    const [isDate, setIsDate] = useState(true); // true for Dates, false for Months

    const pressDate = () => {
        if(!isDate) setIsDate(true);
    };

    const pressMonth = () => {
        if(isDate) setIsDate(false);
    }; 

    return(
        <>
            <View style = {styles.headerContainer}>
                <Ionicons name = "notifications-outline" style = {styles.headerIconleft} size = {24} />
                <Text style={styles.headerText}>Profile</Text>
                <Ionicons name = "log-out-outline" style = {styles.headerIcon} size = {24} />
            </View>
            <View style = {styles.container}>
                <View style = {styles.imageContainer}><Image style = {styles.image} source = {require("../assets/avatar.jpg")} /></View>
                <Text style = {styles.headText}>Name Name</Text>
                <Text style = {styles.editText}>Edit Profile</Text>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.subheadText}>Personal Information</Text>
                </View>
                <View style={styles.inputcontainer}>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                    <TextInput
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Phone Number"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                </View>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.subheadText}>Language</Text>
                </View>
                <View style={styles.switchContainer}>
                    <TouchableOpacity 
                        style={[styles.switch, isDate ? styles.active : styles.inactive]} 
                        onPress={pressDate}
                    >
                        <Text style={[styles.switchText, isDate ? styles.activeSwitchText : styles.inactiveSwitchText]}>
                            English
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.switch, !isDate ? styles.active : styles.inactive]} 
                        onPress={pressMonth}
                    >
                        <Text style={[styles.switchText, !isDate ? styles.activeSwitchText : styles.inactiveSwitchText]}>
                            Thai
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.subheadText}>Change Password</Text>
                </View>
                <View style={styles.inputcontainer}>
                    <TextInput
                        placeholder="Current Password"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                    <TextInput
                        placeholder="New Password"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={"#808080"}
                        style={ styles.textinput }
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height:100, 
        justifyContent: "flex",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        flexDirection: "column-reverse"
    },
    headerText: {
      fontSize: 20,
      fontWeight: "600",
    },
    headerIconleft: {
        position: "absolute",
        left:30,
    },
    headerIcon: {
      position: "absolute",
      right:30,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#fafafa"
    },
    imageContainer:{
        height: 80,
        width: 80,
        borderRadius: 40,
        overflow: "hidden"
    },
    image: {
        width:"100%",
        height: "100%", // Set a height for the image
        resizeMode: 'cover', // Optional: adjust how the image resizes
      },
    headText: {
        fontSize: 20,
        fontWeight: "600",
    },
    rowContainer: {
        flexDirection: "row",
        width: "100%"
    },
    subheadText: {
        fontSize: 18,
        fontWeight: "600",
        margin: 16,
    },
    editText: {
        fontSize: 12,
        color: "#DEBA5C",
        marginBottom: 8
    },
    inputcontainer: {
        gap: 16,
        width: "100%",
    },
    textinput: {
        height: 48,
        width: "100%",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#B1D5B9",
        paddingHorizontal: 24,
      },
    switchContainer: {
        flexDirection: 'row',
        borderRadius: 24,
        backgroundColor: '#314435', // Background color of the switch
        padding: 5,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    active: {
        backgroundColor: '#fafafa', // Active switch color
    },
    inactive: {
        backgroundColor: 'transparent', // Inactive switch color
    },
    switchText: {
        fontSize: 14,
        fontWeight: "600"
    },
    activeSwitchText: {
        color: '#314435', // Active text color
    },
    inactiveSwitchText: {
        color: '#fafafa', // Inactive text color
    },
    button: {
        width: "100%",
        maxWidth: 330,
        backgroundColor: "#314435",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        margin: 24,
        height: 48,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "500",
    }
})

export default Profile