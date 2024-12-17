import React, {useState} from "react";
import {Text, View, StyleSheet, Image, Pressable} from "react-native";
import { CheckBox } from "@rneui/base";



const SelectService = () =>{
    
  const [selectedServices, setSelectedServices] = useState([]);
    const services = [
        'Consultation rooms',
        'Medical evaluation',
        'Education services',
        'Cannabis prescriptions',
        'Dispensary services',
        'Telemedicine services',
      ];

      const toggleService = (service) => {
        setSelectedServices((prev) =>
          prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
      };

    return(
        <View>
            {services.map((service, index) => (
            <Pressable key={index} style={styles.checkboxContainer} onPress={() => toggleService(service)} >
                <Text style={{fontSize:16, flexGrow:1}}>{service}</Text>
                <CheckBox
                containerStyle = {{padding:0, margin:0, right:0}}
                checked={selectedServices.includes(service)}
                checkedColor="red"
                uncheckedColor='#DEBA5C'
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
        height: 30,
        marginTop: 16,
      },
      checkboxLabel: {
        fontSize: 16,
        color: "red",
      },
})


export default SelectService;