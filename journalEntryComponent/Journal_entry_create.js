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

import {useRoute} from "@react-navigation/native";

// scripts

const Journal_entry_create = ({navigation}) => {

    const [title, setTitle] = useState("Test");
    const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto aut blanditiis consequatur cumque delectus, dolore enim explicabo ipsa laboriosam nesciunt obcaecati possimus quod rerum sequi temporibus ut voluptatem!");
    //const navigation = useNavigation();

    const route = useRoute();
    const { journal } = route.params;

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const uploadImage = () => {

    }
    const handleCreateEntry = () => {
        createEntry(title, text).then(r => navigation.navigate('Journal Editor', {userId, journal}));
    }

    const createEntry = async (title, text) => {
        try {
            const docRef = await addDoc(collection(db,"users",userId, "Journal", journal.id, "entry"), {
                title: title,
                text: text,
            });
            //setJournalId(docRef.id);
            console.log("Document written with ID: ", docRef.id);
            setTitle("");
            setText("");

            console.log('Document added successfully.');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <TextInput
                    style={{...styles.input, marginTop: 80}}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={{...styles.input, height: 200}}
                    onChangeText={setText}
                    placeholder="Text"
                />

            </View>


            <View>
                <Pressable
                    onPress={uploadImage}>
                    <View style={{...styles.login_button, backgroundColor: "#69B9AA"}}>
                        <Text style={styles.login_button_text}>Upload image</Text>
                    </View>
                </Pressable>

                <Pressable style={{marginTop: 40}}
                           onPress={handleCreateEntry}>
                    <View style={{...styles.login_button, backgroundColor: "#fff"}}>
                        <Text style={styles.login_button_text}>Create entry</Text>
                    </View>
                </Pressable>
            </View>


        </ScrollView>
    );

}

export default Journal_entry_create


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    input: {
        color: "#030303",
        fontSize: 25,
        backgroundColor: "#FFFFFF",
        padding: 7,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        //automatically sticks to the bottom
        flexDirection: "row",
        borderStyle: "solid",
        margin: 1,
        borderWidth: 2,
        borderColor: "#9DBBB5",
        marginTop:20
    },
    login_button: {
        flexDirection: "row",
        //backgroundColor: "lightblue",
        justifyContent: "space-between",
        padding: 7,
        //alignItems: "center",
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 25,
        marginBottom: 0,
        //elevation: 30,
        //boarder
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    login_button_text:{
        fontSize: 30,
        marginLeft: 20,
        color: "#304D47",
    },
    linkText: {
        color: 'blue',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    text:{
        fontSize: 16,
        alignItems: "center",
        alignSelf: "center"
    },
});