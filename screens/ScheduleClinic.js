import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, Dimensions, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import { Icon, Divider } from '@rneui/themed';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Loading from "../components/Loading.js";
const ScheduleClinic = () => {
    const navigation = useNavigation(); 
    const route = useRoute();
    const clinicId = route.params.clinicId;
    const services = route.params.selectedServices;
    const price = route.params.totalPrice;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedServices, setSelectedServices] = useState(services);
    const [totalPrice, setTotalPrice] = useState(price);
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                console.log(services);
                const clinicDoc = await getDoc(doc(db, 'clinics', clinicId));
                setClinic(clinicDoc.data());
                setSelectedServices(services);
                setTotalPrice(price);
            } catch (error) {
                console.error("Error fetching clinic data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClinic();
    }, [clinicId]);

    const handleAddService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(item => item !== service));
            setTotalPrice(totalPrice - service.price);
        } else {
            setSelectedServices([...selectedServices, service]);
            setTotalPrice(totalPrice + service.price);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.bsContainer}>
                <Text style={styles.bsHeader}>Schedule Appointment</Text>
                <Text style={styles.bsText}>Use the search to select the required service</Text>
                <View style={styles.bsSearchcontainer}>
                    <TextInput
                        placeholderTextColor="black"
                        placeholder="Search Clinic"
                        style={{
                            width: "100%",
                            maxWidth: 1000,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "#cecece",
                            paddingHorizontal: 16,
                            height: 48,
                        }}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView style={styles.bsServicecontainer}>
                    <Text style={styles.bsSubheader}>Select services</Text>
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
                        clinic.services.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                            <View key = {index}>
                                <View style={[styles.bsServicerow, ]}>
                                    <View style={styles.bsServicefirst}>
                                        <Text style={styles.bsText}> {item.name} :</Text>
                                    </View> 
                                    <View style={styles.bsServicesecond}>
                                        <Text style={styles.bsPricetext}>${item.price}</Text>
                                    </View>
                                    {!selectedServices.includes(item) ? 
                                    <View style = {styles.bsServicethird}><Ionicons size = {32} name = {"add-circle-outline"} color = {"#DEBA5C"} onPress= {() => handleAddService(item)} /></View> : 
                                    <View style = {styles.bsServicethird}><Ionicons size = {32} name = {"close-circle-outline"} color = {"#314435"} onPress= {() => handleAddService(item)} /></View>}
                                </View>
                                <Divider orientation="vertical" />
                            </View>
                            
                        ))
                    }
                    
                    <View style = {{height: 80,}}></View>
                    {/* Repeat service rows as needed */}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Pressable style = {styles.button} onPress={() => navigation.navigate("ScheduleClinic2", {clinicId: clinicId, selectedServices: selectedServices, totalPrice: totalPrice})}><Text style = {styles.btText}>Next</Text></Pressable>
                </View>
            </View>
            <Image style={styles.image} blurRadius={4} resizeMode="cover" source={require("../assets/clinicback.png")} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        zIndex: -3,
        width: "100%",
        position:"absolute",
    },
    bsContainer: {
        top: 100,
        borderColor: "#aa1111",
        backgroundColor: "#FAFAFa",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        paddingHorizontal: 25,
        paddingTop: 20,
        alignItems: "center",
        width: "100%",
        paddingBottom: 70,
        flex: 1, // Allow the container to take remaining space
    },
    bsSearchcontainer: {
        height: 48,
        width: "100%",
        margin: 16,
    },
    bsHeader: {
        fontSize: 20,
        marginBottom: 17,
        fontFamily: "Lato_700Bold",
    },
    bsSubheader: {
        fontSize: 16,
        fontFamily: "Lato_700Bold",
        marginBottom: 8,
    },
    bsText: {
        fontSize: 16,
        fontFamily: "Lato_400Regular",
    },
    bsSmtext: {
        fontSize: 14,
        color: "#808080",
        fontFamily: "Lato_400Regular",
    },
    bsPricetext: {
        fontSize: 20,
        fontFamily: "Lato_700Bold",
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
        left: 0,
        right: 0,
        alignItems: 'center',
        width: "90%", // Adjust width as needed
        maxWidth: 350,
        zIndex: 1, // Ensure the button is above other components
    },
    button: {
        bottom: 60,
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
        fontFamily: "Lato_400Regular",
    }
});

export default ScheduleClinic;