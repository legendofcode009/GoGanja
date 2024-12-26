import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const SelectDate = ({selectedDate, setSelectedDate}) => {
    const [isDate, setIsDate] = useState(true); // true for Dates, false for Months
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const handleDayPress = (day) => {
        const pressedDate = new Date(day.dateString);
        if (selectedDate && pressedDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]) {
            setSelectedDate(null); // Unselect if the same date is pressed
        } else {
            setSelectedDate(pressedDate); // Select the new date
        }
    };

    const pressDate = () => {
        if(!isDate) setIsDate(true);
    };

    const pressMonth = () => {
        if(isDate) setIsDate(false);
    };

    const handleMonthSelect = (month) => {
        const selected = new Date(selectedMonth.getFullYear(), month, 1);
        setSelectedMonth(selected);
        setIsDate(true); // Switch back to the calendar view
    };

    const renderMonthList = () => {
        const months = [];
        const currentYear = selectedMonth.getFullYear();
        for (let i = 0; i < 6; i++) {
            const monthIndex = (selectedMonth.getMonth() + i) % 12;
            const year = currentYear + Math.floor((selectedMonth.getMonth() + i) / 12);
            months.push({ key: monthIndex, month: new Date(year, monthIndex).toLocaleString('default', { month: 'long' }), year });
        }
        return months;
    };

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity 
                    style={[styles.switch, isDate ? styles.active : styles.inactive]} 
                    onPress={pressDate}
                >
                    <Text style={[styles.text, isDate ? styles.activeText : styles.inactiveText]}>
                        Dates
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.switch, !isDate ? styles.active : styles.inactive]} 
                    onPress={pressMonth}
                >
                    <Text style={[styles.text, !isDate ? styles.activeText : styles.inactiveText]}>
                        Months
                    </Text>
                </TouchableOpacity>
            </View>
                {isDate ? (
                    <Calendar
                        current={selectedMonth.toISOString().split('T')[0]}
                        onDayPress={handleDayPress}
                        monthFormat={'yyyy MM'}
                        hideArrows={false}
                        enableSwipeMonths={true}
                        markedDates={
                            selectedDate ? {
                                [selectedDate.toISOString().split('T')[0]]: {
                                    selected: true,
                                    selectedColor: '#E0B700', // Example color for selected date
                                    selectedTextColor: '#FFFFFF', // Example text color for selected date
                                },
                            } : {}
                        }
                    />
                ) : (
                    <View style={styles.monthListContainer}>
                        {renderMonthList().reduce((rows, item, index) => {
                            if (index % 2 === 0) {
                                rows.push([]);
                            }
                            rows[rows.length - 1].push(item);
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                                {row.map(item => (
                                    <TouchableOpacity 
                                        key={item.key.toString()} 
                                        style={styles.monthItem} 
                                        onPress={() => handleMonthSelect(item.key)}
                                    >
                                        <Text style={styles.monthText}>{`${item.month}`}</Text>
                                        <Text style={styles.yearText}>{`${item.year}`}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 24,
        backgroundColor: '#DEBA5C', // Background color of the switch
        padding: 5,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    active: {
        backgroundColor: '#fafafa', // Active switch color
    },
    inactive: {
        backgroundColor: 'transparent', // Inactive switch color
    },
    text: {
        fontSize: 14,
        fontFamily: "Lato_400Regular",
    },
    activeText: {
        color: '#090A09', // Active text color
        fontFamily: "Lato_700Bold",
    },
    inactiveText: {
        color: '#fafafa', // Inactive text color
        fontFamily: "Lato_400Regular",
    },
    monthItem: {
        flex: 1,
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: '#E0B700',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthText: {
        fontSize: 16,
        fontFamily: "Lato_700Bold"
    },
    yearText: {
        fontSize: 14,
        fontFamily: "Lato_400Regular",
        color: "#808080"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SelectDate;