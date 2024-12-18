import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert, Image} from 'react-native'
import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth, db } from '../firebaseConfig';
import {setDoc,doc} from 'firebase/firestore'
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    const navigation = useNavigation();

    const register = () => {
        if(email === "" || password === "" || phoneNumber === "") {
            Alert.alert(
                'Invalid Details', 
                'Please enter all the credentials', 
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
            return; // Exit the function if inputs are invalid
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                const uid = user.uid;

                return setDoc(doc(db, "users", uid), { 
                    email: user.email,
                    phoneNumber: phoneNumber
                });
            })
            .then(() => {
                console.log('User registered successfully');
                navigation.navigate("Main");
            })
            .catch((error) => {
                console.error("Error registering user: ", error);
                Alert.alert('Registration Error', error.message);
            });
    }

    return (
        <SafeAreaView style={styles.pgcontainer}>
            <View style={styles.topcontainer}></View>
            <KeyboardAvoidingView style={styles.container}>
                <Image style={styles.image} source={require('../assets/Logo.png')} />
                <View>
                    <Text style={styles.title}>Register your account</Text>
                    <Text style={styles.subtitle}>Enter your details to register</Text>
                </View>
                
                <View style={styles.inputcontainer}>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Email"
                        placeholderTextColor={"#808080"}
                        style={styles.textinput}
                    />
                    <TextInput
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder="Phone Number"
                        placeholderTextColor={"#808080"}
                        style={styles.textinput}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Password"
                        placeholderTextColor={"#808080"}
                        style={styles.textinput}
                        secureTextEntry={true} // Ensure password is hidden
                    />
                </View>
                <Pressable
                    onPress={register} // Call register function on press
                    style={styles.button}
                >
                    <Text style={{fontSize: 20, color: "#fafafa", fontWeight: "500"}}>
                        Register
                    </Text>
                </Pressable>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#090A09", fontSize: 16, fontWeight: "500", marginVertical: 8 }}>
                        Do you have an account?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: "#DEBA5C", fontSize: 16, fontWeight: "500", textDecorationLine: "underline" }}>
                            Login
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen

const styles = StyleSheet.create({
  image:{
    width: 124,
    height: 97,
  },
  pgcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    padding: 20,
    flexDirection: "column",
  },
  topcontainer: {
    flexBasis:1,
  },
  container: {
    flexBasis:10,
    flexGrow: 1,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#090A09",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#090A09",
  },
  inputcontainer: {
    gap: 16,
    width: "100%",
    maxWidth: 350,
  },
  textinput: {
    height: 48,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#B1D5B9",
    paddingHorizontal: 24,
  },
  button: {
    width: "100%",
    maxWidth: 350,
    height: 48,
    backgroundColor: "#314435",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  }
})