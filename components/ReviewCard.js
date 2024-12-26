import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";



const ReviewCard = () => {
    return(
        <View style = {styles.cardcontainer}>
            <View style = {styles.cardtop}><Text style={styles.rating}>⭐ ⭐ ⭐ ⭐ ⭐</Text><Text style = {styles.smtext}>2 weeks ago</Text></View>
            <Text style = {styles.cardcontent}>Lorem ipsum dolor sit amet consectetur. Diam pulvinar ipsum enim venenatis vitae cras nunc. Amet molestie tristique habitant dolor varius fermentum dignissim eget...</Text>
            <Text style = {styles.cardmore}>More</Text> 
            <View style = {styles.cardbottom}>
                <View style = {styles.circleimage}><Image resizeMode="cover" source={require("../assets/avatar1.png")} ></Image></View>
                <View style = {{width: 24}}></View>
                <View><Text style = {styles.cardbgtext}>Monica</Text><Text style = {styles.cardsmtext}>Warsaw, Poland</Text></View>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({ 
    cardcontainer: {
        width: 267, 
        height: 226,
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginHorizontal: 20,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        borderColor: "#dadada"
    },
    cardtop: {
        flexDirection: "row",
        gap: 16,
    },
    cardcontent: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Lato_400Regular",
        overflow: "hidden"
    },
    cardmore: { 
        color: "#DEBA5C",
        fontSize: 12,
        fontFamily: "Lato_400Regular",
        textDecorationLine: "underline",
    },
    cardbottom: {
        marginTop: 8,
        height:40,
        flexDirection: "row",
    },
    smtext: {
        fontFamily: "Lato_400Regular",
        fontSize: 12,
        color: "#808080",
    },
    circleimage: {
        width:40,
        height: 40,
        borderRadius: 20,
    },
    cardbgtext: {
        fontSize: 14,
        fontFamily: "Lato_700Bold",
        color: "#011004"
    },
    cardsmtext: {
        fontSize:12,
        color: "#808080",
        fontFamily: "Lato_400Regular",
    },
    cardrating: {
        fontSize: 10,
    }
})


export default ReviewCard