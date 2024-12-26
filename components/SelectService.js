import React, {useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import { CheckBox } from "@rneui/base";



const SelectService = ({selectedServices, setSelectedServices}) =>{
    
    const services = [
        'Any Service',
        'Consultation Rooms',
        'Medical Evaluation',
        'Education Services',
        'Cannabis Prescriptions',
        'Dispensary Services',
        'Telemedicine Services',
        "Caregiver Support",
        "Research and Development",
        "Legal Assistance"
      ];

      // const toggleService = (service) => {
      //   setSelectedServices((prev) =>
      //     prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
      //   );
      // };

      const toggleService = (service) => {
        if(service === 'Any Service'){
            setSelectedServices(["Any Service"]);
        }else{
            setSelectedServices((prev) => prev.filter((s) => s !== 'Any Service'));
            setSelectedServices((prev) =>
                prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
            );
        }
      };

    return(
        <View>
            {services.map((service, index) => (
            <Pressable key={index} style={styles.checkboxContainer} onPress={() => toggleService(service)} >
                <Text style={styles.checkboxLabel}>{service}</Text>
                <CheckBox
                  containerStyle = {{padding:0, margin:0, right:0}}
                  checked={selectedServices.includes(service)}
                  checkedColor="#DEBA5C"
                  uncheckedColor='#DEBA5C'
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  size = {24}
                  iconRight
                />
            </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        padding: 8,
      },
      checkboxLabel: {
        fontSize: 16,
        fontFamily: "Lato_400Regular",
        flexGrow: 1,
      },
})


export default SelectService;