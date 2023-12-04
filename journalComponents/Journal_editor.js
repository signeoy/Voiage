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

import Journal_entry_print from "../journalEntryComponent/Journal_entry_print";
//import {getJournalList} from "../uploadImageComponents/collectionFunctions";
import {useRoute} from "@react-navigation/native";
import firebase from "firebase/compat/app";
import globalStyles from "../style";

// scripts

const Journal_editor = ({navigation}) => {

    const route = useRoute();
    const { journal } = route.params;

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID


    const deleteFunction = async () => {
        try{
            console.log("deletefunction running", journal.id)
            await deleteCollection();
            await deleteDoc(doc(db, "users", userId, "Journal", journal.id));

            //const journalList = getJournalList()
            navigation.navigate('My Profile',{ userId:userId})
        } catch (e) {
            console.log("error trying to delete: ", e)
        }
    }

    async function deleteCollection() {
        const q = query(collection(db, "users", userId, "Journal", journal.id, "entry"));
        const querySnapshot = await getDocs(q);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });

        Promise.all(deleteOps).then(() => console.log('documents deleted'))
    }

    return (
        <ScrollView style={{flex:1}}>
            <View style={globalStyles.thumbnailContainer}>
                    {journal.img !== "" ? (
                        <View style={globalStyles.thumbnail}>
                            <Image
                                source={{uri: journal.img}}
                                style={{width: '100%', height: '100%'}}
                                resizeMode="cover"
                                onError={(error) => console.log("Error loading image")}
                            />
                        </View>
                    ): null}
                    <View style={globalStyles.entryTitleBox}>
                        <Text style={styles.title}>{journal.title}</Text>
                        <Text style={styles.date}>{journal.date}</Text>
                    </View>

                    <Text style={styles.desc}>{journal.desc}</Text>
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