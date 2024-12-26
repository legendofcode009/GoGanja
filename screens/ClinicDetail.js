import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Text,Button, Dimensions, Pressable } from "react-native";
import { Icon, Divider  } from '@rneui/themed';
import ReviewCard from '../components/ReviewCard';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Loading from "../components/Loading.js";
import { Rating } from 'react-native-ratings';

const ClinicScreen = () => {
    const Navigation = useNavigation();
    const route = useRoute();
    const clinicId = route.params?.clinicId;
    const width = Dimensions.get('window').width;
    const [clinic, setClinic] = useState(null);
    const [showAllServices, setShowAllServices] = useState(false);
    const maxVisibleServices = 4;
    const [loading, setLoading] = useState(true);
    const ratingimage = require("../assets/star.png");

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const clinicDoc = await getDoc(doc(db, 'clinics', clinicId));
                if (clinicDoc.exists()) {
                    setClinic(clinicDoc.data());
                }
            } catch (error) {
                console.error("Error fetching clinic data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClinic();
    }, [clinicId]);

    if (loading) {
        return ( 
            <View style={styles.loadingContainer}>
                <Loading />
            </View>
        );
    }

    if (!clinic) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Error loading clinic data.</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView >
            <View style={styles.pgcontainer}>
                <ScrollView>
                    <View style={styles.carouselcontainer}>
                        {clinic.additionalImages && clinic.additionalImages.length > 0 ? (
                            <Carousel
                                loop
                                width={width}
                                autoPlay={true} 
                                data={clinic.additionalImages}
                                renderItem={({ item, index }) => (
                                    <View
                                        key = {index}
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Image 
                                            style={styles.image} 
                                            source={{ uri: item }} // Use item as the uri
                                            resizeMode="cover" 
                                            onError={() => console.log('Error loading image')}
                                        />
                                    </View>
                                )}
                            />
                        ) : (
                            <Text>No images available</Text>
                        )}
                        <View style={styles.backicon}><Icon name="arrowleft" type="antdesign" onPress={() => Navigation.goBack()} /></View>
                        <View style={styles.loveicon}><Icon name="hearto" type="antdesign" /></View>
                    </View>
                    <View style={{ paddingTop: 24, paddingHorizontal: 20, }}>
                        <Text style={styles.name}>{clinic.name}</Text>
                        <Text style={styles.maintext}>{clinic.city}</Text>
                        <View style={styles.ratecontainer} >
                            <View style={styles.ratesub}>
                                <Text style={styles.ratingtext}>{clinic.rating}</Text>
                                <Rating type='star' startingValue={clinic.rating} fractions={1} imageSize={22} style={{ justifyContent: "space-between" }} readonly/>
                            </View>
                            <Divider orientation="vertical" />
                            <View style={styles.ratesub}>
                                <Text style={styles.ratingtext}>44</Text>
                                <Text style={[styles.ratingtext, { color: "#DEBA5C" }]}>Reviews</Text>
                            </View>
                        </View>
                        <View >
                            <Text style={styles.header}>Welcome to {clinic.name}!</Text>
                            <Text style={[styles.smalltext, { marginTop: 8, marginBottom: 16 }]}>We specialize in cannabis treatment and strive to provide the best medical services to our patients.</Text>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>At the {clinic.name }, we believe in the power of cannabis as a healing agent. Our doctors and specialists have many years of experience in this field.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>We are licensed under regulation and adhere to all safety standards.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>The clinic was founded in 2016 and since then has successfully helped thousands of patients.</Text></View>
                        </View>
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Clinic Services</Text>
                            <Text style={[styles.smalltext, { marginTop: 8, marginBottom: 8 }]}>Our services include, but are not limited to:</Text>
                            {clinic.services.map((service, index) => (
                                <View style={styles.bullet} key={index}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>{service.name}</Text></View>
                            ))}
                        </View>
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Price List</Text>
                            {clinic.services.slice(0, showAllServices ? clinic.services.length : maxVisibleServices).map((service, index) => (
                                <View style={styles.pricelist} key={index}>
                                    <Text style={styles.maintext}>{service.name}</Text>
                                    <Text style={styles.pricetext}>${service.price}</Text>
                                </View>
                            ))}
                            {!showAllServices ?
                                <Pressable onPress={() => setShowAllServices(true)} style={styles.morecontainer}>
                                    <Text style={styles.moretext}>View More</Text>
                                </Pressable>:
                                <Pressable onPress={() => setShowAllServices(false)} style={styles.morecontainer}>
                                    <Text style={styles.moretext}>View Less</Text>
                                </Pressable>
                            }
                        </View> 

                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={[styles.header, {marginBottom: 8}]}>Make an appointment</Text>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>To make an appointment, please use our online form or call</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>If you want to reschedule or cancel your appointment, please let us know at least 24 hours in advance.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>Please contact our administrator with any questions.</Text></View>
                        </View>

                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={[styles.header, {marginBottom: 8}]}>Our opening hours</Text>
                            {clinic.openingHours.short.map((hour, index) => (
                                <View style={styles.bullet} key={index}><Text style={styles.maintext}>{hour}</Text></View>
                            ))  }
                        </View>
                         
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Location</Text>
                            <View style = {styles.mapcontainer}><Image style= {{resizeMode: "cover"}} source={require("../assets/map.png")} /></View>
                            <Text style = {{fontSize: 14,}}>{clinic.address}</Text>
                        </View>
                        
                        <Divider style={styles.divider} orientation="horizontal" /> 
                        <View>
                            <Text style={styles.header}>Reviews</Text>
                        </View>
                    </View>
                    
                    <ScrollView horizontal style = {styles.reviewcontainer}>
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                    </ScrollView>
                    
                    <View style={styles.morecontainer}><Text style = {styles.moretext}>View more reviews</Text></View>
                    <View style = {{height: 30}}></View>

                </ScrollView>
                <View  style={styles.buttoncontainer}>
                    <Pressable style={styles.button} onPress={() => Navigation.navigate("ScheduleClinic", {clinicId: clinicId, totalPrice: 0, selectedServices: []}) } ><Text style={{color: "#fafafa", fontSize:16,}}>Appointment</Text></Pressable>
                </View >
            </View>
        </GestureHandlerRootView>                    
    )
}

const styles = StyleSheet.create({
    pgcontainer: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fafafa',
    },
    image:{
        width: "100%",
        height: "100%",
      },
    backicon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 60,
        left: 25,
    },
    loveicon: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 60,
        right: 25,
    },
    carouselcontainer: {
        height: 300,
        backgroundColor: "#cacaca"
    },
    ratecontainer: {
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 16,
        width: "100%",
        padding: 10,
        maxWidth: 500,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fafafa",
        elevation: 0.8,

        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        borderColor: "#dadada"
    },
    ratesub: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontFamily: "Lato_700Bold",
        marginTop: 4,
        marginBottom: 8,
    },
    header: {
        fontSize: 18,
        fontFamily: "Lato_700Bold",
    }, 
    maintext: {
        fontSize: 16,
        flex:1, 
        fontFamily: "Lato_400Regular",
    },
    ratingtext: {
        fontSize: 14,
        fontFamily: "Lato_400Regular",
        flex:1, 
    },
    smalltext: {
        fontSize: 12,     
        flex:1,
        fontFamily: "Lato_400Regular",
    },
    pricetext: {
        fontSize: 20,
        fontFamily: "Lato_700Bold",
        color: "#B1D5B9",
        position: "absolute",
        right: 0,
    },
    bullet: {
        flexDirection: "row",
        width: "100%",
    },
    divider: {
        marginTop: 24,
        marginBottom: 16,
    },
    pricelist: {
        flexDirection: "row",
        marginTop: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 10,
        height: 200,
    },
    morecontainer: {
        alignItems: "center",
        marginTop: 16,
    },
    moretext: {
        color: "#DEBA5C",
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "Lato_400Regular",
    },
    mapcontainer: {
        height: 130,
        width: "100%",
        maxWidth: 350,
        marginVertical: 16,
        overflow: "hidden",
        borderRadius: 24,
        borderWidth: 0,
        marginHorizontal: "auto",
    },
    reviewcontainer: {
        height: 258,
        borderWidth: 0,
        paddingTop: 16,
    },
    buttoncontainer: {
        height: 80,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        justifyContent: "center",
        alignItems: "center",

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        elevation: 0.8,
    },
    button: {
        height: 48,
        width: "90%",
        maxWidth: 350,
        borderRadius: 16,
        backgroundColor: "#314435",
        alignItems: "center",
        justifyContent: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ClinicScreen