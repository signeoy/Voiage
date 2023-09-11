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

import Journal_comp from "../journalComponents/Journal_comp";
import {useRoute} from "@react-navigation/native";

// scripts

const Journal_print = ({navigation}) => {

    const route = useRoute();
    const { userId } = route.params;

    const [journalList, setJournalList] = useState([]);



    const getJournalList = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db,"users",userId, "Journal")));
            const journals = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //console.log("journal:", journals); // log the todo items to check if they are being fetched correctly
            setJournalList(journals);
        } catch (error) {
            console.error("Error getting todo list: ", error);
        }



    };

    useEffect(() => {
        getJournalList();
    },);



    return (
        <View contentContainerStyle={styles.container}>
            {journalList.length > 0 ? (
                <FlatList
                    data={journalList}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Journal', { userId })}>

                            <Journal_comp
                                title={item.title}
                                date={item.date}
                                desc={item.desc}

                            />

                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <ActivityIndicator />
            )}

        </View>
    );

}

export default Journal_print


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});