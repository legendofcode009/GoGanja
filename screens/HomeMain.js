import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import HomeClinic from './HomeClinic';
import Tour from './HomeTour';
import Hotel from './HomeHotel';

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <Hotel />;
            case 1:
                return <Tour />;
            case 2:
                return <HomeClinic />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header onTabChange={setSelectedTab} />
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

export default Main;