import React from "react";
import {View, Text, Image, StyleSheet, Pressable} from "react-native"
import { useNavigation } from "@react-navigation/native";


const PaymentFailed = () => {
    const navigation = useNavigation();
    return(
        <>
            <View style = {styles.container}>
                <Image source={require("../assets/PayFailed.png")} />
                <Text style = {styles.headtext}>Payment will be declined</Text>
                <Text style = {styles.midtext}>Oops, your payment didn't go through</Text>
                <Pressable style = {styles.button} onPress={() => navigation.navigate("OrderRecipe")}><Text style = {styles.buttonText}>Return to Order</Text></Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    headtext: {
        fontSize: 24,
        fontWeight: "500",
        margin: 16, 
        width: 200,
        textAlign: "center",
    },
    midtext: {
        fontSize: 18,
        marginBottom: 8
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
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
        color: "#fafafa",
    }
})

export default PaymentFailed