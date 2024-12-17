
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import React, { useCallback, useRef, useMemo } from 'react';
import { View, StyleSheet, Image, ScrollView, Text,Button, Dimensions, Pressable } from "react-native";
import { Icon, Divider  } from '@rneui/themed';
import ReviewCard from '../components/ReviewCard';
import { useNavigation } from "@react-navigation/native";
import ScheduleAppointment from './ScheduleClinic';



const ClinicScreen = () => {
    const Navigation = useNavigation();
    const rating = 50;
    const ratingimage = require('../assets/star.png');
    const width = Dimensions.get('window').width;
    const images = [
        require('../assets/Clinic.jpg'),
        require('../assets/download.jpg'),
        require('../assets/images.jpg'),
      ];


      const sheetRef = useRef(null);

      // Define the snap points
      const snapPoints = useMemo(() => ['50%', '90%'], []);


    return (
        <GestureHandlerRootView >
            <View style={styles.pgcontainer}>
                <ScrollView>
                    <View style={styles.carouselcontainer}>
                        <Carousel
                            loop
                            width={width}
                            autoPlay={true} 
                            data={images}
                            renderItem={({ item, index }) => (
                                <View
                                    key = {index}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                                        {item.title}
                                    </Text> */}
                                    <Image 
                                        style = {styles.image} 
                                        source = {item}
                                        resizeMode="cover" 
                                        onLoad={() => console.log('Image loaded')}
                                        onError={() => console.log('Error loading image')}
                                    />
                                </View>
                            )}
                        />
                        <View style={styles.backicon}><Icon name="arrowleft" type="antdesign" onPress={() => Navigation.goBack()} /></View>
                        <View style={styles.loveicon}><Icon name="hearto" type="antdesign" /></View>
                    </View>
                    <View style={{ paddingTop: 24, paddingHorizontal: 20, }}>
                        <Text style={styles.name}>Name Clinic</Text>
                        <Text style={styles.maintext}>Location</Text>
                        <View style={styles.ratecontainer} >
                            <View style={styles.ratesub}>
                                <Text style={styles.ratingtext}>{rating}</Text>
                                {/* <Rating type='custom' ratingImage={ratingimage} imageSize={18}  startingValue={5} fractions = {1} backgroundColor = {"White"} readonly /> */}
                                <Text style={styles.rating}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
                            </View>
                            <Divider orientation="vertical" />
                            <View style={styles.ratesub}>
                                <Text style={styles.ratingtext}>44</Text>
                                <Text style={[styles.ratingtext, { color: "#DEBA5C" }]}>Reviews</Text>
                            </View>
                        </View>
                        <View >
                            <Text style={styles.header}>Welcome to [Clinic Name]!</Text>
                            <Text style={[styles.smalltext, { marginTop: 8, marginBottom: 16 }]}>We specialize in cannabis treatment and strive to provide the best medical services to our patients.</Text>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>At the [Clinic Name] clinic, we believe in the power of cannabis as a healing agent. Our doctors and specialists have many years of experience in this field.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>We are licensed under regulation [name of regulator] and adhere to all safety standards.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>The clinic was founded in [year] and since then has successfully helped thousands of patients.</Text></View>
                        </View>
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Clinic Services</Text>
                            <Text style={[styles.smalltext, { marginTop: 8, marginBottom: 8 }]}>Our services include, but are not limited to:</Text>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>Medical consultations with the use of cannabis.
                            </Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>Selection and updating of recipes.
                            </Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>Physiotherapy and massage.</Text></View>
                            <View style={styles.bullet}><Icon name='dot-single' type="entypo" /><Text style={styles.maintext}>Psychological support and therapy.</Text></View>
                        </View>
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Price List</Text>
                            <View style={styles.pricelist} ><Text style={styles.maintext}>Consultant with a doctor:</Text><Text style={styles.pricetext}>$50</Text></View>
                            <View style={styles.pricelist} ><Text style={styles.maintext}>Prescription renewal:</Text><Text style={styles.pricetext}>$20</Text></View>
                            <View style={styles.pricelist} ><Text style={styles.maintext}>Physiotherapy:</Text><Text style={styles.pricetext}> $30/session</Text></View>
                            <View style={styles.pricelist} ><Text style={styles.maintext}>Massage: </Text><Text style={styles.pricetext}>$40/session</Text></View>
                            <View style={styles.morecontainer}><Text style = {styles.moretext}>View More</Text></View>
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
                            <View style={styles.bullet}><Text style={styles.maintext}>Monday - Friday: 9:00 - 18:00</Text></View>
                            <View style={styles.bullet}><Text style={styles.maintext}>Saturday: 10:00 - 16:00</Text></View>
                            <View style={styles.bullet}><Text style={styles.maintext}>Sunday: Closed</Text></View>
                        </View>
                         
                        <Divider style={styles.divider} orientation="horizontal" />
                        <View>
                            <Text style={styles.header}>Location</Text>
                            <View style = {styles.mapcontainer}><Image style= {{resizeMode: "cover"}} source={require("../assets/map.png")} /></View>
                            <Text style = {{fontSize: 14,}}>Lorem ipsum dolor sit amet consectetur</Text>
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
                    <Pressable style={styles.button} onPress={() => Navigation.navigate("ScheduleClinic")} ><Text style={{color: "#fafafa", fontSize:16,}}>Appointment</Text></Pressable>
                    {/* <Button style = {styles.button} title="Appoinment" onPress={() => {}} />
                        <BottomSheet
                        ref={sheetRef}
                        snapPoints={snapPoints}
                        index={-1}
                    >
                        <BottomSheetView>
                        <Text>Awesome 🔥</Text>
                        </BottomSheetView>
                    </BottomSheet> */}
                </View >
            </View>
            {/* <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                index={-1} // Start closed
                enablePanDownToClose={true} // Allow swipe down to close
            >
                <BottomSheetView style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
                    <ScheduleAppointment />
                </BottomSheetView>
            </BottomSheet> */}
        </GestureHandlerRootView>                    
    )
}

styles = StyleSheet.create({
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

        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 0.5,
        borderWidth: 1,
        borderColor: "#dadada"
    },
    ratesub: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        marginTop: 4,
        marginBottom: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: "600",
    }, 
    maintext: {
        fontSize: 16,
        flex:1, 
    },
    ratingtext: {
        fontSize: 14,
        fontWeight: "500",
        flex:1, 
    },
    smalltext: {
        fontSize: 12,     
        flex:1,
    },
    pricetext: {
        fontSize: 20,
        fontWeight: "600",
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
    }
})

export default ClinicScreen