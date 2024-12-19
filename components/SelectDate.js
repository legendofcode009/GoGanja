import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const ToggleSwitch = () => {
    const [isDate, setIsDate] = useState(true); // true for Dates, false for Months
    const [selectedMonth, setSelectedMonth] = useState(new Date());

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
                        // Use the currently selected month
                        current={selectedMonth.toISOString().split('T')[0]}
                        //onDayPress={(day) => console.log('Selected day', day)}
                        monthFormat={'yyyy MM'}
                        hideArrows={false}
                        enableSwipeMonths={true}
                    />
                ) : (
                    <FlatList
                        data={renderMonthList()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.monthItem} onPress={() => handleMonthSelect(item.key)}>
                                <Text style={styles.monthText}>{`${item.month} ${item.year}`}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key.toString()}
                        numColumns={2} // Show two columns
                    />
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
        fontWeight: "600"
    },
    activeText: {
        color: '#090A09', // Active text color
    },
    inactiveText: {
        color: '#fafafa', // Inactive text color
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
    },
});

export default ToggleSwitch;