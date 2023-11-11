import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ActivityIndicator, ScrollView
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where, setDoc} from "firebase/firestore"

import Journal_entry_print from "../journalEntryComponent/Journal_entry_print";
import getJournalList from "./Journal_print";
import {useRoute} from "@react-navigation/native";

// scripts

const Journal_editor = ({navigation}) => {

    const route = useRoute();
    const { journal } = route.params;

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID


    const deleteFunction = async () => {
        try{
            console.log("deletefunction running", journal.id)
            const querySnapshot = await getDocs(collection(db, "users", userId, "Journal"));
            for (const docSnap of querySnapshot.docs) {
                const querySnapshot2 = await getDocs(collection(db, "users", userId, "Journal", journal.id, "entry"));
                for (const docSnap2 of querySnapshot2.docs) {
                    await deleteDoc(doc(db, "users", userId, "Journal", journal.id, "entry", docSnap2.id));
                }
                await deleteDoc(doc(db, "users", userId, "Journal", journal.id));
            }
            getJournalList()
            navigation.navigate('My Profile',{ userId:userId})
        } catch (e) {
            console.log("error trying to delete: ", e)
        }
    }




    return (
        <ScrollView>
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{journal.title}</Text>
                        <Text style={styles.date}>{journal.date}</Text>
                    </View>

                    <Text style={styles.desc}>{journal.desc}</Text>
                </View>

            </View>
            <Pressable onPress={() => navigation.navigate('Add Entry', { userId: userId, journal: journal })}>
                <View style={styles.headerButton}>
                    <MaterialIcons name={"add"}size={40} color="black"/>
                    <Text >add entry testing</Text>
                </View>
            </Pressable>
            <Pressable onPress={deleteFunction}>
                <View style={styles.headerButton}>
                    <MaterialIcons name={"delete"}size={40} color="black"/>
                    <Text >Delete Journal</Text>
                </View>
            </Pressable>

            <View>
                <Journal_entry_print
                    navigation={navigation}
                    profileId={userId}
                    journal={journal}
                />
            </View>
        </ScrollView>

    );

}


export default Journal_editor


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer:{
        justifyContent: "space-between",
        alignSelf: "center",
        width: "65%",
        backgroundColor: "orange",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 70,

    },
    headerContainer:{
        justifyContent: "space-between",
    },
    title:{
      fontSize: 35,
    },
    date:{
        alignSelf: "flex-end"
    },
    desc:{
      alignSelf: "center",
      fontSize: 20,
    },
    headerButton:{
        flexDirection: "row",
    },
});