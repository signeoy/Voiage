import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, getDoc, deleteDoc, addDoc, collection, getDocs, query, where} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";


const ProfileComp = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState(props.username);

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID



    return (
        <View style={styles.container}>

            <Text style={styles.title}>{props.username}</Text>

            {/* checked icon */}
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
            </Pressable>


        </View>
    );

}

export default ProfileComp

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
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