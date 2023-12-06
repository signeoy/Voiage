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
import {doc, updateDoc, deleteDoc, getDocs, query, collection, orderBy, getDoc, where, setDoc} from "firebase/firestore"

import {useIsFocused, useRoute} from "@react-navigation/native";
import Journal_entry_comp from "./Journal_entry_comp";

// scripts

const Journal_entry_print = ({navigation, profileId, journal}) => {

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const [entryList, setEntryList] = useState([]);



    const getEntryList = async () => {
        console.log("Getting list of entries for journal: ", journal)

        try {
            const querySnapshot = await getDocs(
                query(
                    collection(db, "users", profileId, "Journal", journal.id, "entry"),
                    orderBy("timeStamp", "desc")  // "desc" for descending order, use "asc" for ascending
                )
            );

            const entries = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setEntryList(entries);
            console.log("entries:", entries)
        } catch (error) {
            console.error("Error getting journal entry list: ", error);
        }
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getEntryList(); // Call the function once when the component mounts
        }
    }, [isFocused]);

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
                                    img={item.img}
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
                    <Text style={{margin:'10%', fontFamily:'Imprima-Regular', fontSize:20}}>No Entries Yet :(</Text>
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