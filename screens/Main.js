import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import HomeScreen from './HomeScreen';
import ClinicScreen from './ClinicScreen';
import Tour from './Tour';
import Hotel from './Hotel';

const Main = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <Hotel />;
            case 1:
                return <Tour />;
            case 2:
                return <HomeScreen />;
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