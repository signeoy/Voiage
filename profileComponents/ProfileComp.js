import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, getDoc, deleteDoc, addDoc, collection, getDocs, query, where} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";
import globalStyles from "../style";


const ProfileComp = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState(props.username);

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID



    return (
        <View style={globalStyles.profilebox}>

            <Text style={globalStyles.profilebox_text}>{props.username}</Text>
{/*
             checked icon
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
            </Pressable>*/}


        </View>
    );

}

export default ProfileComp
