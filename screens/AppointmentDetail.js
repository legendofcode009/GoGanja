import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import PageHeader from "../components/PageHeader";
import { Divider } from "@rneui/themed";
import { AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { useRoute, useNavigation } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Loading from "../components/Loading";

const AppointmentDetail = () => {
    const route = useRoute();
    const { appointmentId, clinicId } = route.params;
    const [appointment, setAppointment] = useState(null);
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const appointmentDoc = await getDoc(doc(db, 'clinics_bookings', appointmentId));
                if (appointmentDoc.exists()) {
                    setAppointment(appointmentDoc.data());
                }
            } catch (error) {
                console.error("Error fetching appointment: ", error);
            }
        };
        fetchAppointment();
    }, [appointmentId]);

    useEffect(() => {
        const fetchClinic = async () => {
            if (appointment) {
                try {
                    const clinicDoc = await getDoc(doc(db, 'clinics', clinicId));
                    if (clinicDoc.exists()) {
                        setClinic(clinicDoc.data());
                    }
                } catch (error) {
                    console.error("Error fetching clinic: ", error);
                } finally {
                    setLoading(false); // End loading after fetching clinic
                }
            }
        };
        fetchClinic();
    }, [appointment]);

    const handleCancel = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, 'clinics_bookings', appointmentId));
        } catch (error) {
            console.error("Error canceling appointment: ", error);
        } finally {
            setLoading(false);
            navigation.navigate('Bookings');
        }
    }

    const handleChange = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, 'clinics_bookings', appointmentId));
        } catch (error) {
            console.error("Error changing appointment: ", error);
        } finally {
            setLoading(false);
            navigation.navigate('ScheduleClinic', { clinicId: clinicId, totalPrice: appointment?.totalPrice, selectedServices: appointment?.selectedServices });
        }
    }
    const handleShare = () => {
        console.log("share");
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <PageHeader text={"Appointment details"} />
            <ScrollView style={styles.pageContainer}>
                <View style={styles.cardContainer}>
                    <View style={styles.leftCon}>
                        <Text style={styles.subHeader}>Confirmation number</Text>
                        <Text style={styles.contactText}>{appointment?.confirmationCode}  <Ionicons size={15} name={"copy-outline"} /></Text>
                    </View>
                    <Divider orientation="vertical" />
                    <View style={styles.rightCon}>
                        <Text style={styles.subHeader}>PIN - code</Text>
                        <Text style={styles.contactText}>{appointment?.pinCode} </Text>
                    </View>
                </View>
                <Text style={styles.titleText} >{clinic?.name}</Text>
                <View style={styles.contentCon}>
                    <Text style={styles.mdText}>
                        {appointment && appointment.bookedAt ?
                            new Date(appointment.bookedAt).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false // Use 24-hour format; set to true for 12-hour format
                            })
                            : ''}
                    </Text>
                    <View style={styles.rowCon}>
                        <Text style={styles.smText}>Opening hours:</Text>
                        <View>
                            {clinic?.openingHours && clinic.openingHours.short.map((hour, index) => (
                                <Text key={index} style={styles.smText}>{hour}</Text>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.contentCon}>
                    <Text style={styles.mdText}>Local Clinic Address</Text>
                    <Text style={styles.smText}>{clinic?.address}</Text>
                </View>
                <View style={styles.contentCon}>
                    <Text style={styles.mdText}>Contact Information</Text>
                    <Text style={styles.smText}>Lorem ipsum dolor sit amet consectetur. Diam pulvinar ipsum enim venenatis vitae cras nunc.</Text>
                    <Text style={styles.contactText}>{clinic?.phone}</Text>
                    <Text style={styles.contactText}>{clinic?.email}</Text>
                </View>
                <Divider style={{ paddingHorizontal: 20, }}></Divider>
                <View style={styles.contentCon2}>
                    <Text style={styles.nameText}>Name Procedure</Text>
                    <Text style={styles.smText}>{appointment?.DoctorName}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.smText}>Total Price</Text>
                        <Text style={styles.titleText}>${appointment?.totalPrice.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.contentCon2}>
                    <Text style={styles.mdText}>Recommendations before visiting a doctor</Text>
                    <Text style={styles.smText}>Read information about preparation for the procedure</Text>
                </View>
                <Text style={styles.moreCon}>Learn more</Text>
                <View style={styles.bottomCon}>
                    <Text style={styles.mdText}>Management of appointment</Text>
                    <View style={{ height: 16 }}></View>
                    <Pressable style={styles.buttonCon} ><MaterialIcons size={24} color={"#DEBA5C"} name="do-not-disturb"  /><Text style={styles.mdText}>Cancel appointment</Text></Pressable>
                    <Divider />
                    <Pressable style={styles.buttonCon} ><Ionicons size={24} color={"#DEBA5C"} name="sync" /><Text style={styles.mdText}>Change appointment</Text></Pressable>
                    <Divider />
                    <Pressable style={styles.buttonCon} ><Ionicons size={24} color={"#DEBA5C"} name="share-social-outline" /><Text style={styles.mdText}>Share your appointment</Text></Pressable>
                    <Divider />
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
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
    subHeader: {
        fontSize: 14,
        fontFamily: "Lato_700Bold",
    },
    contactText: {
        fontSize: 14,
        color: "#DEBA5C",
        fontFamily: "Lato_400Regular",
    },
    contentCon: {
        marginHorizontal: 20,
        marginBottom: 16,
        gap: 8,
    },
    rowCon: {
        flexDirection: "row",
        gap: 8,
    },
    titleText: {
        fontSize: 20,
        fontFamily: "Lato_700Bold",
        marginHorizontal: 20,
        marginVertical: 8,
    },
    mdText: {
        fontSize: 16,
        fontFamily: "Lato_700Bold",
    },
    smText: {
        fontSize: 14,
        fontFamily: "Lato_400Regular",
    },
    nameText: {
        fontSize: 16,
        fontFamily: "Lato_700Bold",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    contentCon2: {
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
    },
    moreCon: {
        color: "#DEBA5C",
        fontSize: 16,
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
        marginVertical: 10  ,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: "Lato_400Regular",
    }
})

export default AppointmentDetail