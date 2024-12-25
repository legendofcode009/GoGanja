import React, { useState, useRef } from "react";
import { Text, View, Image, StyleSheet, Pressable, Alert, SafeAreaView, TextInput, PanResponder, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';

const ScheduleClinic2 = () => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [hour, setHour] = useState('12'); // Default hour
    const [minute, setMinute] = useState('00'); // Default minute
    const [period, setPeriod] = useState('AM'); // Add AM/PM state
    const route = useRoute();
    const clinicId = route.params.clinicId;
    const selectedServices = route.params.selectedServices;
    const totalPrice = route.params.totalPrice;
    const [loading, setLoading] = useState(false);
    
    const handleDayPress = (day) => {
        const pressedDate = new Date(day.dateString + 'T12:00:00');
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
                        clinicId: clinicId, 
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

    const formatTimeValue = (value, maxValue) => {
        const numValue = parseInt(value) || 0;
        return String(((numValue % maxValue) + maxValue) % maxValue).padStart(2, '0');
    };

    const adjustHourFor12HourFormat = (hour24) => {
        const hour12 = hour24 % 12;
        return hour12 === 0 ? '12' : String(hour12);
    };

    const createPanResponder = (setValue, maxValue, animValue, isHour = false) => {
        let accumulatedDelta = 0;
        const threshold = 10; // Adjust this value to change sensitivity

        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                accumulatedDelta += gestureState.dy;
                
                if (Math.abs(accumulatedDelta) > threshold) {
                    const change = Math.sign(accumulatedDelta) * -1;
                    accumulatedDelta = 0;

                    setValue((prev) => {
                        let newValue;
                        if (isHour) {
                            newValue = parseInt(prev);
                            newValue = ((newValue + change - 1 + 12) % 12) + 1;
                            
                            if (change !== 0 && newValue === 12) {
                                setPeriod(current => current === 'AM' ? 'PM' : 'AM');
                            }
                        } else {
                            newValue = (parseInt(prev) + change + 60) % 60;
                        }
                        return formatTimeValue(newValue, isHour ? 12 : 60);
                    });

                    // Animate the transition
                    Animated.sequence([
                        Animated.timing(animValue, {
                            toValue: change,
                            duration: 100,
                            useNativeDriver: true,
                        }),
                        Animated.spring(animValue, {
                            toValue: 0,
                            tension: 80,
                            friction: 10,
                            useNativeDriver: true,
                        })
                    ]).start();
                }
            },
            onPanResponderRelease: () => {
                accumulatedDelta = 0;
                Animated.spring(animValue, {
                    toValue: 0,
                    tension: 80,
                    friction: 10,
                    useNativeDriver: true,
                }).start();
            },
        });
    };

    const renderAnimatedNumber = (value, animValue) => {
        const translateY = animValue.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [20, 0, -20], // Reduced movement distance for smoother feel
        });

        const opacity = animValue.interpolate({
            inputRange: [-1, -0.5, 0, 0.5, 1],
            outputRange: [0.3, 1, 1, 1, 0.3], // Fade effect during transition
        });

        // Show previous, current, and next numbers
        const prevNumber = formatTimeValue(parseInt(value) - 1, value === 'hour' ? 12 : 60);
        const nextNumber = formatTimeValue(parseInt(value) + 1, value === 'hour' ? 12 : 60);

        return (
            <View style={styles.timePickerNumbers}>
                <Animated.Text style={[styles.timeText, { opacity: 0.3 }]}>
                    {prevNumber}
                </Animated.Text>
                <Animated.Text 
                    style={[
                        styles.timeText, 
                        { 
                            transform: [{ translateY }],
                            opacity
                        }
                    ]}
                >
                    {value}
                </Animated.Text>
                <Animated.Text style={[styles.timeText, { opacity: 0.3 }]}>
                    {nextNumber}
                </Animated.Text>
            </View>
        );
    };

    const hourPanResponder = createPanResponder(setHour, 24, hourAnim, true);
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
                        {renderAnimatedNumber(minute.padStart(2, '0'), minuteAnim)}
                    </View>
                    <Pressable 
                        style={styles.periodSelector} 
                        onPress={() => setPeriod(current => current === 'AM' ? 'PM' : 'AM')}>
                        <Text style={styles.periodText}>{period}</Text>
                    </Pressable>
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => navigation.navigate("ScheduleClinic", {clinicId: clinicId, selectedServices: selectedServices, totalPrice: totalPrice})}>
                        <Text style={styles.btText}>Total: ${totalPrice.toFixed(2)}</Text>
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
        height: 60,
        width: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '500',
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
    },
    periodSelector: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#314435',
        borderRadius: 5,
        minWidth: 50,
        alignItems: 'center',
    },
    periodText: {
        color: '#fafafa',
        fontSize: 18,
        fontWeight: '500',
    },
    timePickerNumbers: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120, // Increased height to show previous/next numbers
    },
});

export default ScheduleClinic2;