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

import Journal_entry_print from "../journalComponents/Journal_entry_print";
import {useRoute} from "@react-navigation/native";

// scripts

const Journal_editor = ({navigation, userId}) => {

    const route = useRoute();
    const { journal } = route.params;



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

            <View>
                <Journal_entry_print
                    navigation={navigation}
                    profileId={userId}
                    journal={journal}
                />
            </View>
        </View>

    );

}


export default Journal_editor


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});