import React from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons, Feather} from "@expo/vector-icons";
import { Icon, Divider } from '@rneui/themed';
import PageHeader from "../components/PageHeader";

const OrderRecipe = () => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get("window");

    services = [
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageHeader text={"Order Confirmation"} />
            <View style = {styles.container}>
                <Text style={styles.bsText}>Use the search to select the required service</Text>
                <View style={styles.bsSearchcontainer}>
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
                        onEndEditing={() => {}}
                    >
                    </TextInput><Feather name="search" size={20} color="#808080" style = {{position: "absolute", left: 15, top: 15}} />
                </View>
                <ScrollView style={styles.bsServicecontainer}>
                    <View style={[styles.bsServicerow, { marginBottom: 5 }]}>
                        <View style={styles.bsServiceleft}>
                            <Text style={styles.bsSmtext}>Name of the service</Text>
                        </View>
                        <View style={styles.bsServiceright}>
                            <Text style={styles.bsSmtext}>Price</Text>
                        </View>
                    </View>
                    <Divider orientation="vertical" />
                    {
                        services.map((item, index) => (
                            <View key = {index}>
                                <View style={[styles.bsServicerow, ]}>
                                    <View style={styles.bsServicefirst}>
                                        <Text style={styles.bsText}>{item.title} :</Text>
                                    </View>
                                    <View style={styles.bsServicesecond}>
                                        <Text style={styles.bsPricetext}>${item.price}</Text>
                                    </View>
                                    <View style = {styles.bsServicethird}><Ionicons size = {32} name = {"add-circle-outline"} color = {"#DEBA5C"} /></View>
                                </View>
                                <Divider orientation="vertical" />
                            </View>
                            
                        ))
                    }
                    
                    <View style = {{height: 80,}}></View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Pressable style = {styles.button} onPress={() => navigation.navigate("OrderConfirmation")}><Text style = {styles.btText}>Next</Text></Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 13,
        backgroundColor: "#fafafa",
        flex: 1,
        alignItems: "center"
    },
    bsSearchcontainer: {
        height: 48,
        width: "100%",
        marginVertical: 16,
    },
    bsHeader: {
        fontSize: 20,
        marginBottom: 17,
        fontWeight: "500",
    },
    bsSubheader: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    bsText: {
        fontSize: 16,
    },
    bsSmtext: {
        fontSize: 14,
        color: "#808080",
    },
    bsPricetext: {
        fontSize: 20,
        fontWeight: "600",
    },
    bsServicecontainer: {
        width: "100%",
        flex: 1,
        borderWidth: 0,
        paddingTop: 10,
    },
    bsServicerow: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 13,
        justifyContent: "center",
        alignItems: "center"
    },
    bsServiceleft: {
        flex: 9,
    },
    bsServiceright: {
        flex: 3,
    },
    bsServicefirst: {
        flex: 9,
    },
    bsServicesecond: {
        flex: 2,
    },
    bsServicethird: {
        flex: 1,
    },
    buttonContainer: {
        alignItems: 'center',
        width: "90%", // Adjust width as needed
        maxWidth: 350,
        position: "absolute",
        bottom: 20,
    },
    button: {
        height: 48,
        backgroundColor: "#314435",
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },
    btText: {
        color: "#fafafa",
        fontSize: 16,
        fontWeight: "500",
    }
});

export default OrderRecipe;