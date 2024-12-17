import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Tour from './Tour';
import Hotel from './Hotel';
import BookingHeader from '../components/BookingHeader';
import BookingClinic from '../components/BookingClinic';

const BookingScreen = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <Hotel />;
            case 1:
                return <Tour />;
            case 2:
                return <BookingClinic />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BookingHeader onTabChange={setSelectedTab} />
            <View style={styles.tabContent}>
                {renderTabContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContent: {
        flex: 1,
    },
});

export default BookingScreen;