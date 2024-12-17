import React, {useState} from "react";
import {View, Text, Pressable, Image, StyleSheet, ScrollView} from "react-native"
import PageHeader from "../components/PageHeader";
import { Divider } from "@rneui/themed";
import {AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"


const AppointmentDetail = () => {
    return(
        <>
            <PageHeader text={"Appointment details"} />
            <ScrollView style = {styles.pageContainer}>
                <View style = {styles.cardContainer}>
                    <View style = {styles.leftCon}>
                        <Text style = {styles.subHeader}>Confirmation number</Text>
                        <Text style = {styles.contactText}>776435903  <Ionicons size={18} name = {"copy-outline"} /></Text>
                    </View>
                    <Divider orientation="vertical" />
                    <View style = {styles.rightCon}>
                        <Text style = {styles.subHeader}>PIN - code</Text>
                        <Text style = {styles.contactText}>4456 </Text>
                    </View>
                </View>
                <Text style = {styles.titleText} >Name Clinic</Text>
                <View style = {styles.contentCon}>
                    <Text style = {styles.mdText}>20 May 2024 - 12:00</Text>
                    <View style = {styles.rowCon}>
                        <Text style = {styles.smText}>Opening hours:</Text>
                        <View>
                            <Text style = {styles.smText}>Monday - Friday 8:00-20:00</Text>
                            <Text style = {styles.smText}>Saturday - Sunday 7:00-16:00</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.contentCon}>
                    <Text style = {styles.mdText}>Local Clinic Address</Text>
                </View>
                <View style = {styles.contentCon}>
                    <Text style = {styles.mdText}>Contact Information</Text>
                    <Text style = {styles.smText}>Lorem ipsum dolor sit amet consectetur. Diam pulvinar ipsum enim venenatis vitae cras nunc.</Text>
                    <Text style = {styles.contactText}>+48 566 782 346</Text>
                    <Text style = {styles.contactText}>hotel@gmail.com</Text>
                </View>
                <Divider style = {{paddingHorizontal: 20,}}></Divider>
                <View style = {styles.contentCon2}>
                    <Text style = {styles.nameText}>Name Procedure</Text>
                    <Text style = {styles.smText}>Doctor's Name</Text>
                    <View style = {styles.priceRow}>
                        <Text style = {styles.smText}>Total Price</Text>
                        <Text style = {styles.titleText}>$57</Text>
                    </View>
                </View>
                <View style = {styles.contentCon2}>
                    <Text style = {styles.mdText}>Recommendations before visiting a doctor</Text>
                    <Text style = {styles.smText}>Read information about preparation for the procedure</Text>
                </View>
                <Text style = {styles.moreCon}>Learn more</Text>
                <View style = {styles.bottomCon}>
                    <Text style = {styles.mdText}>Management of appointment</Text>
                    <View style ={{height: 16}}></View>
                    <View style = {styles.buttonCon}><MaterialIcons size={24} color={"#DEBA5C"} name = "do-not-disturb" /><Text style = {styles.mdText}>Cancel appointment</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><Ionicons size={24} color={"#DEBA5C"} name = "sync" /><Text style = {styles.mdText}>Change appointment</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><Ionicons size={24} color={"#DEBA5C"} name = "share-social-outline" /><Text style = {styles.mdText}>Share your appointment</Text></View>
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
        elevation: 2,
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
    contentCon: {
        marginHorizontal: 20,
        marginBottom: 16,
        gap:8,
    },
    rowCon: {
        flexDirection: "row",
        gap:8,
    },
    titleText: {
        fontSize: 20, 
        fontWeight: "500",
        marginHorizontal: 20,
        marginVertical: 8,
    },
    mdText: {
        fontSize: 16,
        fontWeight: "500",
    },
    smText: {
        fontSize: 14,
    },
    nameText: {
        fontSize: 16,
        fontWeight: "600",
    },
    priceRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentCon2: {
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
    },
    moreCon:{
        color: "#DEBA5C",
        fontSize:16,
        textAlign: "center",
        textDecorationLine: "underline",
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

export default AppointmentDetail