import React, {useState} from "react";
import {View, Text, Pressable, Image, StyleSheet, ScrollView} from "react-native"
import PageHeader from "../components/PageHeader";
import { Divider } from "@rneui/themed";
import {AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"


const RecipeDetail = () => {
    return(
        <>
            <PageHeader text={"Recipe details"} />
            <ScrollView style = {styles.pageContainer}>
                <View style = {styles.cardContainer}>
                    <View style = {styles.leftCon}>
                        <Text style = {styles.subHeader}>Date of issue</Text>
                        <Text style = {styles.contactText}>20.05.2024 </Text>
                    </View>
                    <Divider orientation="vertical" />
                    <View style = {styles.rightCon}>
                        <Text style = {styles.subHeader}>Recipe code</Text>
                        <Text style = {styles.contactText}>4456 </Text>
                    </View>
                </View>
                
                <View style = {styles.rowCon}>
                    <Text style = {styles.mdText}>Patient:</Text>
                    <Text style = {styles.buttonText}>Patient Name</Text>
                </View>
                <View style = {styles.rowCon}>
                    <Text style = {styles.mdText}>Patient:</Text>
                    <Text style = {styles.buttonText}>Patient Name</Text>
                </View>
                <View style = {styles.priceRow}>
                    <Text style = {styles.mdText}>Prescribed medication</Text>
                    <Text style = {styles.titleText}>Epidiolex 100 mg.</Text>
                </View>

                <Text style = {styles.moreCon}>Active</Text>
                <View style = {styles.bottomCon}>
                    <Text style = {styles.mdText}>Recipe Management</Text>
                    <View style ={{height: 16}}></View>
                    <View style = {styles.buttonCon}><MaterialIcons size={24} color={"#DEBA5C"} name = "do-not-disturb" /><Text style = {styles.buttonText}>Cancel recipe</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><Ionicons size={24} color={"#DEBA5C"} name = "share-social-outline" /><Text style = {styles.buttonText}>Share your recipe</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><AntDesign size={24} color={"#DEBA5C"} name = "download" /><Text style = {styles.buttonText}>Download recipe (PDF)</Text></View>
                    <Divider />
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    pageContainer:{
        backgroundColor: "#fafafa"
    },
    cardContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 16,
        height: 55,
        backgroundColor: "#fdfdfd",
        elevation: 4,
        borderRadius: 16,
        padding: 8,
    },
    leftCon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rightCon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    subHeader:{
        fontSize: 14,
        fontWeight:"500",
    },
    contactText: {
        fontSize: 14,
        color: "#DEBA5C",
    },
    rowCon: {
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: "row",
        gap:8,
    },
    titleText: {
        fontSize: 18, 
        fontWeight: "500",
    },
    mdText: {
        fontSize: 16,
        fontWeight: "500",
    },
    priceRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
        marginHorizontal: 20,
    },
    moreCon:{
        color: "#DEBA5C",
        fontSize:16,
        textAlign: "center",
    },
    bottomCon: {
        marginVertical: 24,
        marginHorizontal: 20,
    },
    buttonCon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
    }
})

export default RecipeDetail