import React, { useState, useEffect } from "react";
import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import ClinicCard from "../components/ClinicCard.js";

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialResults = route.params?.results || [];
  const initialQuery = route.params?.searchQuery || '';
  const [results, setResults] = useState(initialResults);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    // Perform initial search with the passed query and filters
    handleSearch();
  }, []);

  const handleSearch = () => {
    // Assuming initialResults is already filtered based on location, price range, and services
    const filteredResults = initialResults.filter(clinic =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredResults);
  };

  const renderClinicCard = ({ item }) => <ClinicCard clinic={item} />;

  return (
    <>
      <View style={styles.topcontainer}>
        <Text style={styles.header}>Search Result</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholderTextColor="black"
            placeholder="Search Clinic"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onEndEditing={handleSearch}
          />
          <Feather
            name="arrow-left"
            size={20}
            color="#808080"
            style={styles.backIcon}
            onPress={() => navigation.navigate("Main")}
          />
          <Pressable
            onPress={() => navigation.navigate("Filter")}
            style={styles.filterButton}
          >
            <Image
              style={styles.filterIcon}
              source={require("../assets/mage_filter.png")}
            />
          </Pressable>
        </View>
      </View>

      <SafeAreaView style={styles.pgcontainer}>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderClinicCard}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No clinics found</Text>
          }
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "600",
  },
  topcontainer: {
    alignItems: "center",
    height: 130,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomColor: "#cecece",
    backgroundColor: "#fafafa",
    borderBottomWidth: 2,
    elevation: 5,
  },
  searchContainer: {
    marginTop: 5,
    marginHorizontal: 25,
    flexDirection: "row",
  },
  searchInput: {
    display: "flex",
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#cecece",
    paddingHorizontal: 40,
    flexGrow: 1,
  },
  backIcon: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderColor: "#cecece",
    borderWidth: 1,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  pgcontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#808080",
  },
});