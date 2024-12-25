import React, { useState, useEffect, useCallback } from "react";
import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ClinicCard from "../components/ClinicCard.js";
import Loading from "../components/Loading.js";
const HomeClinic = () => {
  const navigation = useNavigation();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    setLoading(true);
    try {
      const clinicCollection = collection(db, 'clinics');
      const clinicSnapshot = await getDocs(clinicCollection);
      const clinicList = clinicSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClinics(clinicList);
    } catch (error) {
      console.error("Error fetching clinics: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (submitProp) => {
    navigation.navigate("Search", { searchQuery: submitProp, results: clinics });
  };

  const renderClinicCard = ({ item }) => <ClinicCard clinic={item} />;

  const ListHeader = React.memo(({ onSearchSubmit }) => {
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const localOnSearchSubmit = () => {
      onSearchSubmit(localSearchQuery);
      setLocalSearchQuery('');
    };
    return (
      <View style={styles.headerContainer}>
        <TextInput
          placeholder="Search Clinic"
          placeholderTextColor="black"
          style={styles.searchInput}
          value={localSearchQuery}
          onChangeText={setLocalSearchQuery}
          onSubmitEditing={localOnSearchSubmit}
          returnKeyType="search"
      />
      <Feather name="search" size={20} color="#808080" style={styles.searchIcon} />
      <Pressable
        onPress={() => navigation.navigate("Filter")}
        style={styles.filterButton}
      >
        <Image style={styles.filterIcon} source={require('../assets/mage_filter.png')} />
      </Pressable>
    </View>
  )});

  const renderListFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.footerTextContainer}>
        <Text style={styles.footerTitle}>Prescription management</Text>
        <Text style={styles.footerDescription}>Leave a request and get a recipe easily and quickly</Text>
      </View>
      <View style={styles.footerSpacer} />
      <Pressable
        style={styles.footerButton}
      >
        <AntDesign name="arrowright" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.pgContainer}>
      <FlatList
        data={clinics}
        keyExtractor={(item) => item.id}
        renderItem={renderClinicCard}
        ListHeaderComponent={
          <ListHeader
            onSearchSubmit={handleSearchSubmit}
          />
        }
        ListFooterComponent={renderListFooter}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeClinic;

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pgContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  headerContainer: {
    margin: 20,
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
  searchIcon: {
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
  footerContainer: {
    marginHorizontal: 20,
    marginBottom: 165,
    borderWidth: 1,
    borderColor: "#CECECE",
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  footerTextContainer: {
    flexShrink: 1,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "500",
    width: '100%',
  },
  footerDescription: {
    fontSize: 14,
    width: '100%',
  },
  footerSpacer: {
    width: 10,
  },
  footerButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#314435",
    alignItems: "center",
    justifyContent: "center",
  },
});
