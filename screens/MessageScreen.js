import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import React, {useState} from 'react'
import {Ionicons} from "@expo/vector-icons"

const MessageScreen = () => {
    const [selected, setSelected] = useState("all");
        const aaa = [
            { id: "1", title: "Hello", text: "How are you?", time: "10:00 AM", type: "travels" },
            { id: "2", title: "Hey", text: "What's up?", time: "10:05 AM", type: "clinic" },
        ];
    const renderMessages = ({ item }) => <Messages message = {item} />;

    const Messages = ({message}) => {
       return (
         <View style={styles.message}>
             <Image style = {styles.image} source={require("../assets/message.png")} />
             <View style = {styles.messageText}>
                 <Text style={styles.messageText1}>{message.title}</Text>
                 <Text style={styles.messageText2}>{message.text}</Text>
             </View>
             <Text style={styles.messageTime}>{message.time}</Text>
         </View>
       )
     };
  return (
    <View style = {styles.header}>
        <View style = {styles.container}>
            <View style={styles.pageheadercontainer}>
                <Text style={styles.headertext}>Message</Text>
                <Ionicons size={16} style={styles.headericon} name = "search" />
            </View>
            <View style={styles.viewContainer}></View>
        </View>
        <View style={styles.filter}>
            <Pressable style = {selected === "all"?styles.activebutton:styles.button} onPress={() =>setSelected("all")}><Text style = {selected === "all"?styles.activeButtonText:styles.buttonText}>All</Text></Pressable>
            <Pressable style = {selected === "travels"?styles.activebutton:styles.button} onPress={() =>setSelected("travels")}><Text style = {selected === "travels"?styles.activeButtonText:styles.buttonText}>Travels</Text></Pressable>
            <Pressable style = {selected === "clinic"?styles.activebutton:styles.button} onPress={() =>setSelected("clinic")}><Text style = {selected === "clinic"?styles.activeButtonText:styles.buttonText}>Clinic</Text></Pressable>
            <Pressable style = {selected === "system"?styles.activebutton:styles.button} onPress={() =>setSelected("system")}><Text style = {selected === "system"?styles.activeButtonText:styles.buttonText}>System</Text></Pressable>
        </View>
        <View style={styles.messageList}>
            <FlatList
                data={aaa}
                keyExtractor={(item) => item.id}
                renderItem={renderMessages}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    </View>
  )
}
export default MessageScreen


const styles = StyleSheet.create({
    header: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FAFAFA",
    },
    container: {
        width: "100%",
        backgroundColor: "#fafafa",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      },
    pageheadercontainer: {
        height: 100,
        paddingTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    headertext:{
        fontSize: 20,
        color: "#314435",
        fontFamily: "Lato_700Bold",
    },
    headericon: {
        width: 16,
        height: 16,
        zIndex: 3,
        position: "absolute",
        right: 40,
        top: 60,
    },
    viewContainer: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: "100%",
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 2,
      },
    filter: {
        flexDirection: 'row',
        height: 38,
        paddingLeft: 4,
    },
    button: {
        height: 38,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#FAFAFA",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
        marginTop: 8,
    },
    activebutton: {
        height: 38,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#DEBA5C",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 16,
        marginTop: 8,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Lato_700Bold",
    },
    activeButtonText: {
        fontSize: 14,
        fontFamily: "Lato_700Bold",
        color: "#FAFAFA"
    },
    messageList: {
        marginHorizontal: 20,
        marginTop: 30,
        flex: 1,
    },
    message: {
        flexDirection: 'row',
        alignItems: "center",
        height: 48,
        marginBottom: 8,
        margin: 2,
        backgroundColor: "#FAFAFA",
        elevation: 1,
    },
    image: {
        marginLeft: 8,
        height: 32,
        width: 32
    },
    messageText: {
        marginLeft: 16
    },
    messageText1: {
        fontSize: 16,
        fontFamily: "Lato_700Bold",
    },
    messageText2: {
        fontSize: 12,
        fontFamily: "Lato_400Regular",
    },
    messageTime: {
        fontSize:12,
        fontFamily: "Lato_400Regular",
        color: "#808080",
        position: "absolute",
        right: 8,
        top: 8
    }
})