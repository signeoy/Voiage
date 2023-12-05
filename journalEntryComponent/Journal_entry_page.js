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
import globalStyles from "../style";

// scripts
//andre personers profiler journal entry page. uten redigering og sånt.
const Journal_entry_page = ({navigation, profileId}) => {

    const route = useRoute();
    const { journal } = route.params;
    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    return (
        <ScrollView style={{flex:1}}>
            <View style={globalStyles.thumbnailContainer}>
                {journal.img !== "" ? (
                    <View style={globalStyles.thumbnail}>
                        <Image
                            source={{uri: journal.img}}
                            style={{width: 360, height: 200, alignSelf:'center'}}
                            resizeMode="cover"
                            onError={(error) => console.log("Error loading image")}
                        />
                    </View>
                ): null}
                <View>
                    <View style={globalStyles.entryTitleBox}>
                        <Text style={globalStyles.journalEditorTitle}>{journal.title}</Text>
                        <Text style={globalStyles.journalEditorDate}>{journal.date}</Text>
                    </View>
                    <View style={styles.container_desc}>
                        <Text style={globalStyles.journalEditorDesc}>{journal.desc}</Text>
                    </View>

                </View>
            </View>
            <View style={{marginTop:100}}>
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
    container_desc:{
        width: "80%",
        alignContent: "center",
        alignSelf: "center",
    }
});