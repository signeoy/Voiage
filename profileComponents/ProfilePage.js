import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ActivityIndicator
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import ProfileComp from "./ProfileComp";

const ProfilePage = ({navigation}) => {
    const route = useRoute();
    const { id } = route.params;
    const { username } = route.params;
    const { userId } = route.params;



    return (
        <View style = {{flexDirection : "row", padding: 15}}>
            <View style = {{flex:2, }}>
                <Text style={styles.profile_name}>{username}</Text>
            </View>
            <View style={{flex: 1,}}>
                <Text>Star here, {username}</Text>
            </View>
        </View>
    );

}

export default ProfilePage


const styles = StyleSheet.create({
    profile_name:{
        fontSize: 40,
        margin: 20,
        flex: 3
    },
});