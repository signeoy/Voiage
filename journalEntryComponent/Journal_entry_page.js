import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ActivityIndicator, ScrollView, Image
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where, setDoc} from "firebase/firestore"

import Journal_entry_print from "./Journal_entry_print";
import {useRoute} from "@react-navigation/native";

// scripts
//andre personers profiler journal entry page. uten redigering og sånt.
const Journal_entry_page = ({navigation, profileId}) => {

    const route = useRoute();
    const { journal } = route.params;
    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    return (
        <ScrollView>
            {journal.img !== "" ? (
                <View style={{alignItems:"center"}}>
                    <Image
                        source={{uri: journal.img}}
                        style={{width: 200, height: 200}}
                        onError={(error) => console.log("Error loading image")}
                    />
                </View>
            ): null}
            <View>
                <View style={styles.container_title}>
                    <Text style={{...styles.title}}>{journal.title}</Text>
                    <Text style={{...styles.date}}>{journal.date}</Text>
                </View>
                <View style={styles.container_desc}>
                    <Text >{journal.desc}</Text>
                </View>

            </View>

            <View>
                <Journal_entry_print
                    navigation={navigation}
                    profileId={profileId}
                    journal={journal}
                />
            </View>
        </ScrollView>

    );
}


export default Journal_entry_page


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,

    },
    date: {
        fontSize: 15,
    },
    desc: {
        fontSize: 15,
        alignSelf: "center",
    },
    container_title:{
        backgroundColor: "blue",
        width: "70%",
        height: 80,
        alignSelf: "center",
        alignContent: "space-between",
        padding: 10,
        flexDirection: "row"
    },
    container_desc:{
        width: "80%",
        alignContent: "center",
        alignSelf: "center",
    }
});