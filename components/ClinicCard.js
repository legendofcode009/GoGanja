import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Icon } from '@rneui/base';



const ClinicCard = ({clinic}) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  }
  //console.log("Rendering ClinicCard with clinic:", clinic.address);
  return (
    <View style={styles.card}>
      <View style = {{borderRadius: 20, width: "100%", height: 254, borderWidth: 0, borderColor:"#3333ff", overflow: "hidden"}}>
        <Pressable onPress = {() => {navigation.navigate("Clinic")}}>
          <Image
            source={{ uri: clinic.featuredImage }}
            style={styles.image}
            // onPress = {() => {navigation.navigete("Clinic")}}
          />
        </Pressable>
        <View style = {styles.favoriteButton}>
          <Icon name = "heart" type = "antdesign" color={like ? "#DEBA5C" : "#fafafa"} size={30}  onPress={() => toggleLike()} />
        </View>
        <View style = {styles.favoriteButton}>
          <Icon name = "hearto" type = "antdesign" color={"#343434"} size={30}  onPress={() => toggleLike()} />
        </View>
      </View>
      <View style = {{flexDirection : "row", marginTop: 8, }}>
        <Text style={styles.clinicName}>{clinic.name}</Text>
        <Text style={styles.rating}>⭐ 5.0</Text>
      </View>
      <Text style={styles.location}>{clinic.address}</Text>
      <Text style={styles.consultFee}>{clinic.initialConsultFee}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginHorizontal:20,
    marginBottom: 24,
  },
  image: {
    width:"100%",
    height: "100%", // Set a height for the image
    resizeMode: 'cover', // Optional: adjust how the image resizes
  },
  favoriteButton: {
    position: 'absolute',
    overflow: "visible",
    top: 28,
    right: 26,
    width:32,
    height: 32,
    borderRadius: 32,
    
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    marginLeft: 16,
    color: '#DEBA5C',
  },
  location: {
    fontSize: 14,
    color: '#090A09',
  },
  consultFee: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default ClinicCard;