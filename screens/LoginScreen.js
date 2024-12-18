import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const login = () => {
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    })
  }

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.navigate("Main");
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView
      style={ styles.pgcontainer }
    >
      <View style = {styles.topcontainer}></View>
      <KeyboardAvoidingView style = {styles.container}>
        <Image style={styles.image} source={require('../assets/Logo.png')} />
        
        <View>
          <Text style={ styles.title }>
            Login to your account
          </Text>
          <Text style={ styles.subtitle }>
            Enter your details to log in
          </Text>
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
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor={"#808080"}
            style={ styles.textinput }
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate("Main")}
          style={ styles.button }
        >
          <Text style={{fontSize: 20, color: "#fafafa", fontWeight: "500"}}>
            Log in
          </Text>
        </Pressable>
        <View style = {{ justifyContent: "center", alignItems: "center", }}>
          <Text style={{ color: "#090A09", fontSize: 16, fontWeight: "500", marginVertical: 8,}}>
              Don't have an account?
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#DEBA5C", fontSize: 16, fontWeight: "500",  textDecorationLine: "underline"}}>
              Register
            </Text>
          </Pressable>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
