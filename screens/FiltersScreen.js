import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import SelectPrice from '../components/SelectPrice';
import PageHeader from '../components/PageHeader';
import SelectLocation from '../components/SelectLocation';
import SelectDate from '../components/SelectDate';
import SelectCondition from "../components/SelectCondition.js"
import SelectService from '../components/SelectService.js';
import { useNavigation } from '@react-navigation/native';

const FilterScreen = () => {
  const navigation = useNavigation();

    const [activeSections, setActiveSections] = useState([]);

    const sections = [
        { title: 'Price', content: <SelectPrice /> },
        { title: 'Location', content: <SelectLocation /> },
        { title: 'Date', content: <SelectDate /> },
        { title: 'Condition', content: <SelectCondition />  },
        { title: 'Services', content: <SelectService />  },
    ];

    const renderSectionTitle = (section) => {
        return (<View style = {{height: 16}}></View>);
    };

    const renderHeader = (section, index, isActive) => {
        return (
            <TouchableOpacity 
                style={isActive ? styles.activeHeader : styles.header} 
                onPress={() => updateSections(isActive ? [] : [index])} // Toggle section
            >
                <Text style = {isActive ? styles.activetitle : styles.title}>{section.title}</Text>
            </TouchableOpacity>
        );
    };

    const renderContent = (section) => {
        return (
            <View style={styles.content}>
                {section.content}
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
      <>
        <View style = {styles.pgcontainer}>
            <ScrollView style = {{flex:1,}}>
                <PageHeader text = {"Filters"} />
                <Accordion
                    activeSections={activeSections}
                    sections={sections}
                    renderSectionTitle={renderSectionTitle}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={updateSections}
                />
                <View style = {{height: 30}}></View>
            </ScrollView>
            
        </View>
        <View style = {styles.buttoncontainer}>
              <Pressable onPress={() => navigation.navigate("Filter")} style = {styles.leftbutton}><Text style = {styles.leftbtnletter}>Clear All</Text></Pressable>
              <Pressable onPress={() => navigation.navigate("Search")} style = {styles.rightbutton}><Text style = {styles.rightbtnletter}>Show Results</Text></Pressable>
        </View>
      </>
        
    );
};

const styles = StyleSheet.create({
    pgcontainer: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fafafa",
    },
    sectionTitle: {
        fontWeight: 'bold',
        padding: 10,
    },
    header: {
        padding: 10,
        backgroundColor: '#fafafa',
        borderRadius: 16,
        height: 60,
        justifyContent: "center",
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 }, // iOS
        shadowOpacity: 0.3, // iOS
        shadowRadius: 4, // iOS
        elevation: 2, // Android
        borderWidth: 1,
        borderColor: "#ececec"
    },
    activeHeader: {
        padding: 10,
        backgroundColor: '#fcfcfc',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderWidth: 1,
        borderBottomWidth:0,
        borderColor: "#dedede",
        height: 60,
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#808080",
    },
    activetitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#090A09",
    },
    content: {
        padding: 10,
        backgroundColor: '#fcfcfc',
        elevation: 2,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        
        borderWidth: 1,
        borderTopWidth:0,
        borderColor: "#dedede",
    },
    buttoncontainer: {
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "#fafafa",
      borderColor: "#cecece",
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      padding: 25,

      shadowColor: '#000', // iOS
      shadowOffset: { width: 0, height: 2 }, // iOS
      shadowOpacity: 0.3, // iOS
      shadowRadius: 4, // iOS
      elevation: 5, // Android
    },
    leftbutton: {
      width: "45%",
      height: 50,
      borderWidth: 1,
      borderColor: "#314435",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    leftbtnletter: {
      fontSize: 16,
      fontWeight: "500",
    },
    rightbutton: {
      width: '45%',
      height: 50,
      backgroundColor: "#314435",
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    rightbtnletter: {
      fontSize: 16,
      fontWeight: "500",
      color: "#fafafa",
    },
});

export default FilterScreen;