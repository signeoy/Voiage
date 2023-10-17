import firebase from 'firebase/app';
import 'firebase/firestore';
import Journal_print from "../journalComponents/Journal_print";
import Journal_comp from "../journalComponents/Journal_comp";
import getJournalList from "../journalComponents/Journal_print";
import {useRoute} from "@react-navigation/native";
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

import React, { useState, useEffect } from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig"
import {
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    collection,
    addDoc,
    getDoc,
    where,
    setDoc,
    getFirestore
} from "firebase/firestore"


const deleteJournal = async () => {

    const route = useRoute();
    const {userId} = route.params;

    const querySnapshot = await getDocs(collection(db, "users", userId, "Journal"));
    for (const docSnap of querySnapshot.docs) {
        const querySnapshot2 = await getDocs(collection(db, "users", userId, "Journal", docSnap.id, "entry"));
        for (const docSnap2 of querySnapshot2.docs) {
            await deleteDoc(doc(db, "users", userId, "Journal", docSnap.id, "entry", docSnap2.id));
        }
        await deleteDoc(doc(db, "users", userId, "Journal", docSnap.id));
    }
    Journal_print('Journal');

}

export default deleteJournal