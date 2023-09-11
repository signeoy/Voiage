import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig"
import {doc, getDoc, deleteDoc, addDoc, collection, getDocs, query, where} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";


const Journal_comp = (props) => {
    const [title, setTitle] = useState(props.title);
    const [date, setDate] = useState(props.title);
    const [desc, setDesc] = useState(props.title);

    const route = useRoute();
    const { userId } = route.params;



    return (
        <View style={styles.container}>

            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.title}>{props.date}</Text>
            <Text style={styles.title}>{props.desc}</Text>

        </View>
    );

}

export default Journal_comp

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        padding: 10,
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: "500",
    },
});