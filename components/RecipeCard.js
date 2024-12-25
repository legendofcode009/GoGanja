import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons"
import { Divider } from '@rneui/themed';


const RecipeCard = ({ isDropdownOpen, toggleDropdown, recipe }) => {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  }

  const handleOptionPress = (action) => {
    switch (action) {
      case 'cancel':
        // Handle cancel logic
        break;
      case 'change':
        // Handle change logic
        break;
      case 'share':
        // Handle share logic
        break;
    }
    toggleDropdown(false);
  };

  const handleRecipeDetail = () => {
    console.log(recipe.id);
    navigation.navigate("RecipeDetail", { recipeId: recipe.id });
  }

  return (
    <View style={styles.card}>
      <Pressable style={styles.headContainer} onPress={() => handleRecipeDetail()}>
        <Text style={styles.timeText}>
          {recipe && recipe.createdAt ?
            `${new Date(recipe.createdAt).toLocaleDateString()} - ${new Date(recipe.createdAt).toLocaleTimeString()}`
            : 'Date not available'}
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.bgText}>Recipe code: </Text>
          <Text style={styles.headText}>{recipe?.recipeCode}</Text>
        </View>
        <Text style={styles.smText}>{recipe?.doctorName}</Text>
        <Text style={styles.headText}>{recipe?.medications[0]?.name} {recipe?.medications[0]?.dosage}</Text>
        <TouchableOpacity
          style={styles.threeDot}
          onPress={() => toggleDropdown(!isDropdownOpen)}
        >
          <Entypo name="dots-three-vertical" size={16} />
        </TouchableOpacity>
      </Pressable>
      <View style={styles.stateCon}><Text style = {{color: "#DEBA5C"}}>{recipe?.status}</Text></View>
      <Divider color='#aaaaaa' />
      <View style={styles.agianContainer}>
        <Text style={styles.againText}><Ionicons size={24} color={"#DEBA5C"} name="sync" />   Order the recipe again</Text>
      </View>
      {isDropdownOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('cancel')}
            >
              <Text>Cancel Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('change')}
            >
              <Text>Change Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleOptionPress('share')}
            >
              <Text>Share</Text>
            </TouchableOpacity>
          </View>
        )}
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
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headContainer: {
    padding: 20,
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
    color: "#DEBA5C",
  },
  threeDot: {
    position: "absolute",
    right: 30,
    top: 30,
  },
  agianContainer: {
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