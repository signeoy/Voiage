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
import { db } from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where, setDoc} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";
import Journal_entry_comp from "./Journal_entry_comp";

// scripts

const Journal_entry_print = ({navigation, profileId, journal}) => {

    const [entryList, setEntryList] = useState([]);


    const getEntryList = async () => {

        try {
            const querySnapshot = await getDocs(query(collection(db,"users",profileId, "Journal", journal.id, "entry")));
            const entries = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //console.log("journal:", journals); // log the items to check if they are being fetched correctly
            setEntryList(entries);
        } catch (error) {
            console.error("Error getting journal entry list: ", error);
        }
    };

    useEffect(() => {
        getEntryList(); // Call the function once when the component mounts
    }, []);


    return (
        <View>
            <View styles={styles.container}>
                {entryList.length > 0 ? (
                    <FlatList
                        data={entryList}
                        renderItem={({ item }) => (
                            <View>
                                <Journal_entry_comp
                                    title={item.title}
                                    text={item.text}
                                    id={item.id}
                                    journalId={journal.id}
                                    profileId={profileId}
                                    getEntryList={getEntryList}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text>No Entries</Text>
                    //<ActivityIndicator />
                )}

            </View>
        </View>
    );
}


export default Journal_entry_print


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});