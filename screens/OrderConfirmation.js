import React, {useState} from "react";
import { Text, View, Image, StyleSheet, TextInput, ScrollView, SafeAreaView, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Ionicons, AntDesign} from "@expo/vector-icons";
import { Icon, Divider } from '@rneui/themed';
import PageHeader from "../components/PageHeader";

const OrderConfirmation = () => {
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
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageHeader text={"Order Confirmation"} />
            <View style = {styles.container}>
                <ScrollView style={styles.bsServicecontainer}>
                <Text style={styles.bsSubheader}>Your Order</Text>
                    <View style={[styles.bsServicerow, { marginBottom: 5 }]}>
                        <View style={styles.firstHead}>
                            <Text style={styles.bsSmtext}>Name of the medication</Text>
                        </View>
                        <View style={styles.secondHead}>
                            <Text style={styles.bsSmtext}>Quantity</Text>
                        </View>
                        <View style={styles.secondHead}>
                            <Text style={styles.bsSmtext}>Price</Text>
                        </View>
                    </View>
                    <Divider orientation="vertical" />
                    {
                        services.map((item, index) => (
                            <>
                                <View key = {index} style={[styles.bsServicerow, ]}>
                                    <View style={styles.firstHead}>
                                        <Text style={styles.bsPricetext}>{item.title} :</Text>
                                    </View>
                                    <View style={styles.oneFlex}>
                                        <Ionicons size = {28} name = {"remove-circle-outline"} color = {"#DEBA5C"} />
                                    </View>
                                    <View style={styles.oneFlex}>
                                        <Text style = {styles.bsText}>1</Text>
                                    </View>
                                    <View style={styles.oneFlex}>
                                        <Ionicons size = {28} name = {"add-circle-outline"} color = {"#DEBA5C"} />
                                    </View>
                                    <View style={styles.twoFlex}>
                                        <Text style={styles.bsText}>${item.price}</Text>
                                    </View>
                                    <View style={styles.oneFlex}>
                                        <AntDesign size = {18} name = {"close"} />
                                    </View>
                                </View>
                                <Divider orientation="vertical" />
                            </>
                            
                        ))
                    }

                    <Pressable style = {styles.totalButton} onPress={() => navigation.navigate("ScheduleClinic2")}>
                        <Text style={styles.btText}>Total Price :</Text>
                        <Text style={styles.btText}>$70</Text>
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
                        <View style = {styles.flexLeft}><Image style={styles.payIcon} resizeMode="cover" source={require("../assets/cash.png")} /></View>
                        <View style = {styles.flexRight}><Text style = {styles.bsSubheader}>Cash at the reception</Text></View>
                    </View>
                    <View style = {styles.paycontainer}>
                        <View style = {styles.flexLeft}><Image style={styles.payIcon} resizeMode="cover" source={require("../assets/visa.png")} /></View>
                        <View style = {styles.flexRight}><Text style = {[styles.bsSubheader, {marginBottom: 0,}]}>Credit Card</Text><Text style = {styles.bsSubheader}>**** **** **** 6542</Text></View>
                    </View>
                    <Pressable style = {styles.button} onPress={() => navigation.navigate("PaymentFailed")}><Text style = {styles.btText}>Complete</Text></Pressable>
                    <View style = {{height: 80,}}></View>
                    {/* Repeat service rows as needed */}
                </ScrollView>
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
        marginBottom: 12,
    },
    dataTimeText: {
        color: "#DEBA5C",
        fontSize: 16,
        paddingLeft: 16,
    },
    bsText: {
        fontSize: 16,
        fontWeight: "600"
    },
    bsSmtext: {
        fontSize: 14,
        color: "#808080",
    },
    bsPricetext: {
        fontSize: 18,
        fontWeight: "500",
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
        gap: 2,
    },
    firstHead: {
        flex: 6,
        justifyContent: "center",
    },
    secondHead: {
        flex: 3,
        justifyContent: "center",
    },
    oneFlex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    twoFlex: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
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
        height: 48,
        backgroundColor: "#314435",
        borderRadius: 16,
        width: "100%",
        marginVertical: 20,
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
        marginVertical: 5,
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
    flexLeft: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    flexRight: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
    },
    gradientBorder: {
        borderRadius: 10,
        padding: 2, // Adjust padding to create space for the gradient border
    },
})

export default OrderConfirmation;