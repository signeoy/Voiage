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

import Journal_comp from "../journalComponents/Journal_comp";
import {useIsFocused, useRoute} from "@react-navigation/native";

// scripts

const Journal_print = ({navigation, profileId}) => {

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const [journalList, setJournalList] = useState([]);


    const getJournalList = async () => {
        console.log("Getting list of journals")
        try {
            const querySnapshot = await getDocs(query(collection(db,"users",profileId, "Journal")));
            const journals = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            //console.log("journal:", journals);
            setJournalList(journals);
        } catch (error) {
            console.error("Error getting journal list: ", error);
        }

    };

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getJournalList();
        }
    }, [isFocused]);


    return (
        <View contentContainerStyle={styles.container}>
            {userId === profileId ? (
                journalList.length > 0 ? (
                        <FlatList
                            data={journalList}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={() => navigation.navigate('Journal Editor', {
                                    userId: userId,
                                    journal: item
                                })}>

                                    <Journal_comp
                                        title={item.title}
                                        date={item.date}
                                        desc={item.desc}
                                        img={item.img}
                                        id = {item.id}
                                        profileId={profileId}
                                        getJournalList={getJournalList}
                                    />


                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <Text style={{margin:'10%', fontFamily:'Imprima-Regular', fontSize:20}}>No posts</Text>
                        //<ActivityIndicator />
                    )
            ) : (
                journalList.length > 0 ? (
                        <FlatList
                            data={journalList}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={() => navigation.navigate('Journal', {
                                    profileId: profileId,
                                    journal: item
                                })}>
                                    <Journal_comp
                                        title={item.title}
                                        date={item.date}
                                        desc={item.desc}
                                        img={item.img}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    ) : (
                        <Text style={{margin:'10%', fontFamily:'Imprima-Regular', fontSize:20}}>No posts</Text>
                        //<ActivityIndicator />
                    )
            )

            }


        </View>
    );

}


export default Journal_print


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});