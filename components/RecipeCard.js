import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import {Entypo, Ionicons} from "@expo/vector-icons"
import { Divider } from '@rneui/themed';


const RecipeCard = ({recipe}) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  }

  const handleRecipeDetail = () => {
    console.log(recipe.id);
    navigation.navigate("RecipeDetail", {recipeId: recipe.id});
  }

  return (
    <View style={styles.card}>
        <Pressable style = {styles.headContainer} onPress={() => handleRecipeDetail()}>
            <Text style={styles.timeText}>
              {recipe && recipe.createdAt ? 
                `${new Date(recipe.createdAt).toLocaleDateString()} - ${new Date(recipe.createdAt).toLocaleTimeString()}` 
                : 'Date not available'}
            </Text> 
            <View style = {styles.rowContainer}>
                <Text style = {styles.bgText}>Recipe code: </Text>
                <Text style = {styles.headText}>{recipe?.recipeCode}</Text>
            </View> 
            <Text style = {styles.smText}>{recipe?.doctorName}</Text>
            <Text style = {styles.headText}>{recipe?.medications[0]?.name} {recipe?.medications[0]?.dosage}</Text>
            <Entypo style = {styles.threeDot} name = "dots-three-vertical" size={16} />
        </Pressable>
        <View style = {styles.stateCon}><Text>{recipe?.status}</Text></View>
        <Divider color='#aaaaaa' />
        <View style = {styles.agianContainer}>
            <Text style = {styles.againText}><Ionicons size={24} color={"#DEBA5C"} name = "sync" />   Order the recipe again</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: "#fafafa",
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  headContainer: {
    padding: 8,
    borderWidth: 0,
  },
  headText: {
    fontSize: 18,
    fontWeight: "500",
  },
  timeText: {
    fontSize: 16,
    color: "#808080",
  },
  rowContainer: {
    flexDirection: "row",
    height: 22,
    gap: 8,
    marginTop: 11,
    alignItems: "center"
  },
  contentContainer: {
    marginLeft: 16,
  },
  bgText: {
    fontSize: 16,
    fontWeight: '600',
  },
  smText: {
    fontSize: 14,
    marginBottom: 8,
  },
  stateCon: {
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  threeDot: {
    position: "absolute",
    right: 20,
    top: 8,
  },
  agianContainer:{
    height: 43,
    padding: 8,
    alignItems: "center"
  },
  againText: {
    fontSize: 16,
    color: "#DEBA5C",
  }
});

export default RecipeCard;