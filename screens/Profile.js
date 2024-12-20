import { Pressable, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";

const Profile = () => {
    const [email,setEmail] = useState("");
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [imageUri, setImageUri] = useState(require("../assets/download.png"));
    const navigation = useNavigation();
    const [isEnglish, setIsEnglish] = useState(true); // true for Dates, false for Months
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    setEmail(user.email);
                    await fetchUserData(user.uid);
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false); // Ensure loading is set to false after data fetching
            }
        };

        fetchData();
    }, []);

    const fetchUserData = async (uid) => {
        const db = getFirestore();
        const userDoc = doc(db, "users", uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.profileImage) {
                setImageUri({ uri: data.profileImage });
            }                   
            if (data.name) {
                setName(data.name);
            }
            if (data.phoneNumber) {
                setPhoneNumber(data.phoneNumber);
            }
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out!");
                navigation.navigate("Login"); // Navigate to the login screen after logout
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    const pressEnglish = () => {
        if(!isEnglish) setIsEnglish(true);
    };

    const pressThai = () => {
        if(isEnglish) setIsEnglish(false);
    }; 

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.uri;
                setImageUri({ uri });

                // Check network connectivity
                const isConnected = await checkNetworkConnectivity();
                if (!isConnected) {
                    alert('No internet connection. Please try again later.');
                    return;
                }

                // Upload image to Firebase Storage
                const storage = getStorage();
                const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);
                
                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();

                    await uploadBytes(storageRef, blob);
                    console.log('Uploaded a blob or file!');
                    const downloadURL = await getDownloadURL(storageRef);

                    // Update Firestore with the new image URL
                    const db = getFirestore();
                    const userDoc = doc(db, "users", auth.currentUser.uid);
                    await updateDoc(userDoc, {
                        profileImage: downloadURL
                    });

                    console.log('Profile image updated in Firestore');
                } catch (error) {
                    console.error("Error during fetch or upload: ", error);
                    alert('Failed to upload image. Please try again.');
                }
            }
        } catch (error) {
            console.error("Error picking image: ", error);
            alert(`Failed to pick image. Error: ${error.message}`);
        }
    };

    // Helper function to check network connectivity
    const checkNetworkConnectivity = async () => {
        try {
            const response = await fetch('https://www.google.com', { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#314435" style={styles.loadingIndicator} />;
    }


    return(
        // loading ? <ActivityIndicator size="large" color="#314435" style={styles.loadingIndicator} /> :
        <>
            <View style = {styles.headerContainer}>
                <Ionicons name = "notifications-outline" style = {styles.headerIconleft} size = {24} />
                <Text style={styles.headerText}>Profile</Text>
                <Ionicons name = "log-out-outline" style = {styles.headerIcon} size = {24} onPress={handleLogout} />
            </View>
            <View style = {styles.container}>
                <Pressable style = {styles.imageContainer} onPress={pickImage}>
                    <Image style = {styles.image} source = {imageUri} />
                </Pressable>
                <Text style = {styles.headText}>{name}</Text>
                <Text style = {styles.editText}>Edit Profile</Text>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.subheadText}>Personal Information</Text>
                </View>
                <View style={styles.inputcontainer}>
                    <TextInput
                        value={email}
                        editable={false}
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
                        secureTextEntry
                    />
                </View>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.subheadText}>Language</Text>
                </View>
                <View style={styles.switchContainer}>
                    <TouchableOpacity 
                        style={[styles.switch, isEnglish ? styles.active : styles.inactive]} 
                        onPress={pressEnglish}
                    >
                        <Text style={[styles.switchText, isEnglish ? styles.activeSwitchText : styles.inactiveSwitchText]}>
                            English
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.switch, !isEnglish ? styles.active : styles.inactive]} 
                        onPress={pressThai}
                    >
                        <Text style={[styles.switchText, !isEnglish ? styles.activeSwitchText : styles.inactiveSwitchText]}>
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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