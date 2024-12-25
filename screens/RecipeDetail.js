import React, {useState, useEffect} from "react";
import {View, Text, Pressable, Image, StyleSheet, ScrollView, ActivityIndicator} from "react-native"
import PageHeader from "../components/PageHeader";
import { Divider } from "@rneui/themed";
import {AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome} from "@expo/vector-icons"
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import Loading from "../components/Loading";

const RecipeDetail = () => {
    const route = useRoute();
    const recipeId = route.params.recipeId;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log(recipeId);
                const docRef = doc(db, "clinics_prescriptions", recipeId);
                const docSnap = await getDoc(docRef);
                setRecipe(docSnap.data());
            } catch (error) {
                console.error("Error fetching recipe:", error.message);
                console.error("Error details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
        console.log(recipe);
    }, []);

    if (loading) {
        return <Loading />
    }

    return(
        <>
            <PageHeader text={"Recipe details"} />
            <ScrollView style = {styles.pageContainer}>
                <View style = {styles.cardContainer}>
                    <View style = {styles.leftCon}>
                        <Text style = {styles.subHeader}>Date of issue</Text>
                        <Text style = {styles.contactText}>
                            {recipe?.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : 'Date not available'}
                        </Text>
                    </View>
                    <Divider orientation="vertical" />
                    <View style = {styles.rightCon}>
                        <Text style = {styles.subHeader}>Recipe code</Text>
                        <Text style = {styles.contactText}>{recipe?.recipeCode} </Text>
                    </View>
                </View>
                
                <View style = {styles.rowCon}>
                    <Text style = {styles.mdText}>Patient:</Text>
                    <Text style = {styles.buttonText}>{recipe?.patientName}</Text>
                </View>
                <View style = {styles.rowCon}>
                    <Text style = {styles.mdText}>Doctor:</Text>
                    <Text style = {styles.buttonText}>{recipe?.doctorName}</Text>
                </View>
                <View style = {styles.priceRow}>
                    <Text style = {styles.mdText}>Prescribed medication</Text>
                    <Text style = {styles.titleText}>{recipe?.medications[0]?.name} {recipe?.medications[0]?.dosage}</Text>
                </View>

                <Text style = {styles.moreCon}>{recipe?.status}</Text>
                <View style = {styles.bottomCon}>
                    <Text style = {styles.mdText}>Recipe Management</Text>
                    <View style ={{height: 16}}></View>
                    <View style = {styles.buttonCon}><MaterialIcons size={24} color={"#DEBA5C"} name = "do-not-disturb" /><Text style = {styles.buttonText}>Cancel recipe</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><Ionicons size={24} color={"#DEBA5C"} name = "share-social-outline" /><Text style = {styles.buttonText}>Share your recipe</Text></View>
                    <Divider />
                    <View style = {styles.buttonCon}><AntDesign size={24} color={"#DEBA5C"} name = "download" /><Text style = {styles.buttonText}>Download recipe (PDF)</Text></View>
                    <Divider />
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    pageContainer:{
        backgroundColor: "#fafafa"
    },
    cardContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 16,
        height: 55,
        backgroundColor: "#fdfdfd",
        elevation: 4,
        borderRadius: 16,
        padding: 8,
    },
    leftCon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rightCon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    subHeader:{
        fontSize: 14,
        fontWeight:"500",
    },
    contactText: {
        fontSize: 14,
        color: "#DEBA5C",
    },
    rowCon: {
        marginHorizontal: 20,
        marginVertical: 5,
        flexDirection: "row",
        gap:8,
    },
    titleText: {
        fontSize: 18, 
        fontWeight: "500",
    },
    mdText: {
        fontSize: 16,
        fontWeight: "500",
    },
    priceRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
        marginHorizontal: 20,
    },
    moreCon:{
        color: "#DEBA5C",
        fontSize:16,
        textAlign: "center",
    },
    bottomCon: {
        marginVertical: 24,
        marginHorizontal: 20,
    },
    buttonCon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
    }
})

export default RecipeDetail