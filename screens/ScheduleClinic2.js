import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable, Alert, SafeAreaView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';

const ScheduleClinic2 = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [hour, setHour] = useState('12'); // Default hour
    const [minute, setMinute] = useState('00'); // Default minute

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setTimePickerVisible(true);
    };

    const handleConfirmTime = (newTime) => {
        setSelectedTime(newTime);
        setTimePickerVisible(false);
    };

    const handleNext = () => {
        
        if (selectedDate && selectedTime) {
            Alert.alert(`Appointment Scheduled`, `Date: ${selectedDate}\nTime: ${selectedTime}`);
            // Navigate or proceed to next step
        } else {
            Alert.alert('Please select both date and time.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.image} blurRadius={4} resizeMode="cover" source={require("../assets/clinicback.png")} />
            <View style={styles.bsContainer}>
                <Text style={styles.bsHeader}>Schedule Appointment</Text>
                <Text style={styles.bsText}>Select the Date and Time</Text>

                <Calendar
                    current={new Date().toISOString().split('T')[0]}
                    onDayPress={handleDayPress}
                    monthFormat={'yyyy MM'}
                    hideArrows={false}
                    enableSwipeMonths={true}
                    style = {{width: 350, margin: 30,}}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#dd99ee'
                      }}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="HH"
                        keyboardType="numeric"
                        maxLength={2}
                        value={hour}
                        onChangeText={setHour}
                    />
                    <Text style={styles.separator}>:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MM"
                        keyboardType="numeric"
                        maxLength={2}
                        value={minute}
                        onChangeText={setMinute}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("ScheduleClinic")}>
                        <Text style={styles.btText}>Total</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("ScheduleClinic3")}>
                        <Text style={styles.btText}>Next</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        zIndex: -3,
        width: "100%",
        position: "absolute",
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
        flex: 1,
    },
    bsHeader: {
        fontSize: 20,
        marginBottom: 17,
        fontWeight: "500",
    },
    bsText: {
        fontSize: 16,
    },
    selectedDateText: {
        fontSize: 16,
        marginVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    input: {
        height: 50,
        width: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    selectedTimeText: {
        fontSize: 16,
        marginVertical: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        width: "90%",
        gap: 20,
        maxWidth: 350,
    },
    button: {
        height: 48,
        backgroundColor: "#314435",
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    btText: {
        color: "#fafafa",
        fontSize: 16,
        fontWeight: "500",
    }
});

export default ScheduleClinic2;