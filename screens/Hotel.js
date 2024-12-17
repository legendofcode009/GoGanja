import React from "react";
import {View, Text, Image, StyleSheet, Pressable} from "react-native"


const Hotel = () => {
    return(
        <>
            <View style = {styles.container}>
                <Image source={require("../assets/tour.png")} />
                <Text style = {styles.headtext}>Soon - Hotel</Text>
                <Text style = {styles.midtext}>We are working on developing this section</Text>
                <Text style = {styles.text}>Subscribe for notifications so you don't miss an update</Text>
                <Pressable style = {styles.button}><Text style = {styles.buttonText}>Subscribe</Text></Pressable>
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

export default Hotel