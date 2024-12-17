import React, {useState} from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Divider } from '@rneui/themed';

const ScheduleClinic3 = () => {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get("window");

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phoneNumber,setPhoneNumber] = useState();

    services = [
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
        {title: "Consultation with a doctor", price: 30},
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.bsContainer}>
                <Text style={styles.bsHeader}>Schedule Appointment</Text>
                <Text style={styles.bsSubheader}>Your Order</Text>
                <ScrollView style={styles.bsServicecontainer}>
                    <View style = {styles.bsServicerow}>
                        <Text style={styles.bsSubheader}>Date</Text>
                        <Text style = {styles.dataTimeText}>20 May 2024 - 12:00</Text>
                    </View>
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
                                <View key = {index} style={[styles.bsServicerow, ]}>
                                    <View style={styles.bsServiceleft}>
                                        <Text style={styles.bsText}>{item.title} :</Text>
                                    </View>
                                    <View style={styles.bsServiceright}>
                                        <Text style={styles.bsPricetext}>${item.price}</Text>
                                    </View>
                                </View>
                                <Divider orientation="vertical" />
                            </View>
                            
                        ))
                    }

                    <Pressable style = {styles.totalButton} onPress={() => navigation.navigate("ScheduleClinic2")}>
                                        <Text style={styles.bsText}>Total Price :</Text>
                                        <Text style={styles.bsPricetext}>$70</Text>
                    </Pressable>
                    
                    <View style ={{width: "100%", alignItems: "center"}}>
                        <Text style={{textAlign: "center", fontSize: 16, margin: 8}}>Enter your contact details to complete your appointment</Text>
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
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            placeholder="Phone Number"
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

                    <Text style={styles.bsSubheader}>Payment Method</Text>
                    <View style = {styles.paycontainer}>
                        <View style = {styles.bsServiceright}><Image style={styles.payIcon} resizeMode="cover" source={require("../assets/cash.png")} /></View>
                        <View style = {styles.bsServiceleft}><Text style = {styles.bsSubheader}>Cash at the reception</Text></View>
                    </View>
                    <View style = {styles.paycontainer}>
                        <View style = {styles.bsServiceright}><Image style={styles.payIcon} resizeMode="cover" source={require("../assets/visa.png")} /></View>
                        <View style = {styles.bsServiceleft}><Text style = {styles.bsSubheader}>Credit Card</Text><Text style = {styles.bsSubheader}>**** **** **** 6542</Text></View>
                    </View>
                    
                    <View style = {{height: 170,}}></View>
                    {/* Repeat service rows as needed */}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Pressable style = {styles.button} onPress={() => navigation.navigate("ScheduleClinic2")}><Text style = {styles.btText}>Next</Text></Pressable>
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
    bsHeader: {
        fontSize: 20,
        marginBottom: 17,
        fontWeight: "500",
    },
    bsSubheader: {
        fontSize: 16,
        fontWeight: "600",
    },
    dataTimeText: {
        color: "#DEBA5C",
        fontSize: 16,
        paddingLeft: 16,
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
    },
    bsServiceleft: {
        flex: 9,
        justifyContent: "center"
    },
    bsServiceright: {
        flex: 3,
        justifyContent: "center"
    },
    buttonContainer: {
        left: 0,
        right: 0,
        alignItems: 'center',
        width: "90%", // Adjust width as needed
        zIndex: 1, // Ensure the button is above other components
    },
    totalButton: {
        height: 48,
        marginVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#DEBA5C",
        justifyContent: "space-between",
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        flexDirection: "row"
    },
    button: {
        bottom: 60,
        height: 48,
        backgroundColor: "#314435",
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    btText: {
        color: "#fafafa",
        fontSize: 16,
        fontWeight: "500",
    },
    inputcontainer: {
        width: "100%",
        alignItems: "center"
      },
    textinput: {
        marginVertical: 8,
        height: 48,
        width: "100%",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#6363ee",
        paddingHorizontal: 24,
    },
    paycontainer: {
        marginVertical: 20,
        height: 68,
        width: "100%",
        borderRadius: 17,
        paddingHorizontal: 30,
        paddingVertical: "auto",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#eeeeee",
        elevation: 2,
    },
    payIcon: {
        width:48,
        height: 48,
    },
    gradientBorder: {
        borderRadius: 10,
        padding: 2, // Adjust padding to create space for the gradient border
    },
});

export default ScheduleClinic3;