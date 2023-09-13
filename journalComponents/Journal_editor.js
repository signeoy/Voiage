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

import Journal_entry_comp from "../journalComponents/Journal_comp";
import {useRoute} from "@react-navigation/native";

// scripts

const Journal_editor = ({navigation, userId}) => {

    const route = useRoute();
    const { journal } = route.params;

    const [entryList, setEntryList] = useState([]);



/*    const getEntryList = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db,"users",userId, "Journal", journalId, "entry")));
            const journals = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //console.log("journal:", journals); // log the items to check if they are being fetched correctly
            setEntryList(journals);
        } catch (error) {
            console.error("Error getting journal entry list: ", error);
        }
    };

    useEffect(() => {
        getEntryList(); // Call the function once when the component mounts
    }, []);*/


    return (
        <View>
            <View>
                <Text >{journal.title}</Text>
                <Text >{journal.desc}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Add Entry', { userId: userId, journal: journal })}>
                <View style={{}}>
                    <Text >add entry</Text>

                </View>
            </Pressable>

{/*            <View styles={styles.container}>
                {entryList.length > 0 ? (
                    <FlatList
                        data={entryList}
                        renderItem={({ item }) => (
                            <View>
                                <Journal_entry_comp
                                    title={item.title}
                                    text={item.text}
                                />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text>No posts</Text>
                    //<ActivityIndicator />
                )}

            </View>*/}
        </View>

    );

}


export default Journal_editor


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});