import React, { useState, useRef } from "react";
import { Text, View, Image, StyleSheet, Pressable, Alert, SafeAreaView, TextInput, PanResponder, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';

const ScheduleClinic2 = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [hour, setHour] = useState('12'); // Default hour
    const [minute, setMinute] = useState('00'); // Default minute
    const route = useRoute();
    const clinic = route.params.clinic;
    const selectedServices = route.params.selectedServices;
    const totalPrice = route.params.totalPrice;

    const handleDayPress = (day) => {
        const pressedDate = new Date(day.dateString + 'T00:00:00');
        if (selectedDate && pressedDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]) {
            setSelectedDate(null); // Unselect if the same date is pressed
        } else {
            setSelectedDate(pressedDate); // Select the new date
        }
        console.log(selectedDate);
    };


    const handleNext = () => {
        if (selectedDate) {
            selectedDate.setHours(parseInt(hour));
            selectedDate.setMinutes(parseInt(minute));

            Alert.alert(
                `Appointment Scheduled`, 
                `Date: ${selectedDate.toLocaleDateString()}\nTime: ${selectedDate.toLocaleTimeString()}`, 
                [
                    {text: "OK", onPress: () => navigation.navigate("ScheduleClinic3", { 
                        clinic: clinic, 
                        selectedServices: selectedServices, 
                        selectedDate: selectedDate.toISOString(), 
                        totalPrice: totalPrice })},
                    {text: "Cancel", onPress: () => console.log("Cancel Pressed")}
                ]
        );
            
        } else {
            Alert.alert('Please select both date and time.');
        }
    };

    const hourAnim = useRef(new Animated.Value(0)).current;
    const minuteAnim = useRef(new Animated.Value(0)).current;

    const createPanResponder = (setValue, maxValue, animValue) => {
        return PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const change = -gestureState.dy / 10; // Directly map swipe distance to change

                animValue.setValue(change); // Update animation value based on swipe

                setValue((prev) => {
                    const newValue = (parseInt(prev) + change + maxValue) % maxValue;
                    return Math.round(newValue); // Ensure the value is an integer
                });
            },
            onPanResponderRelease: () => {
                Animated.timing(animValue, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }).start();
            },
        });
    };

    const renderAnimatedNumber = (value, animValue) => {
        const translateY = animValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-50, 0, 50], // Adjust these values to control the animation distance
        });

        return (
            <Animated.Text style={[styles.timeText, { transform: [{ translateY }] }]}>
                {value}
            </Animated.Text>
        );
    };

    const hourPanResponder = createPanResponder(setHour, 24, hourAnim);
    const minutePanResponder = createPanResponder(setMinute, 60, minuteAnim);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.image} blurRadius={4} resizeMode="cover" source={require("../assets/clinicback.png")} />
            <View style={styles.bsContainer}>
                <Text style={styles.bsHeader}>Schedule Appointment</Text>
                <Text style={styles.bsText}>Select the Date and Time</Text>

                <Calendar
                    current={new Date().toISOString().split('T')[0]}
                    onDayPress={(day) => handleDayPress(day)}
                    monthFormat={'yyyy MM'}
                    hideArrows={false}
                    enableSwipeMonths={true}
                    style = {{width: 350, margin: 30,}}
                    markedDates={{
                        [selectedDate ? selectedDate.toISOString().split('T')[0] : '']: {
                            selected: true,
                            selectedColor: '#00adf5',
                            selectedTextColor: '#ffffff'
                        }
                    }}
                />

                <View style={styles.inputContainer}>
                <View style={styles.timePicker} {...hourPanResponder.panHandlers}>
                    {renderAnimatedNumber(hour, hourAnim)}
                    </View>
                    <Text style={styles.separator}>:</Text>
                    <View style={styles.timePicker} {...minutePanResponder.panHandlers}>
                        {renderAnimatedNumber(minute, minuteAnim)}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("ScheduleClinic", {clinic: clinic})}>
                        <Text style={styles.btText}>Total: ${totalPrice}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleNext}>
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
    separator: {
        fontSize: 32,
        marginHorizontal: 10,
    },
    timePicker: {
        height: 50,
        width: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    timeText: {
        fontSize: 32,
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