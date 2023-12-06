import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator, ScrollView
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where, setDoc} from "firebase/firestore"
import * as ImagePicker from 'expo-image-picker';

import { uploadImageToFirebase } from "../uploadImageComponents/uploadToStorage"


const Journal_create = ({navigation}) => {

    const [journalId, setJournalId] = useState("Test");
    const [title, setTitle] = useState("Test");
    const [date, setDate] = useState("test date");
    const [img, setImg] = useState("");


    const [description,setDescription] = useState("test desc");

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const [image, setImage] = useState(null);
    const [imageExists, setImageExists] = useState(null);


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 3],
            quality: 1
        });
        const source = { uri: result.assets[0].uri };
        console.log(source);
        setImage(source);
        setImageExists(true)
    };

    useEffect(() => {
        // This useEffect will trigger whenever the 'img' state changes
        console.log('Updated img:', img);
    }, [img]);

    const uploadImage = async () => {
        try {
            const downloadURL = await uploadImageToFirebase(image.uri);
            setImg(downloadURL);
            setImage(null);
            console.log('Download URL:', downloadURL);
            //let journals = getJournalList(userId);
            createJournal(title, date, description, downloadURL).then(r => navigation.navigate('My Profile', {userId}))
        } catch (e) {
            console.error("Error uploading image", e);
        }
    };

    const handleCreateJournal = async () => {
        if (imageExists) {
            await uploadImage();
            // Call getJournalList after the image is uploaded

        } else {
            await createJournal(title, date, description, img);
            // Call getJournalList after creating the journal
            //let journals = getJournalList(userId);
            navigation.navigate('My Profile', { userId });
        }
    };

    const createJournal = async (title, date, desc, img) => {
        try {
            const dateTime = new Date().toLocaleString()
            const docRef = await addDoc(collection(db,"users", userId, "Journal"), {
                title: title,
                date: date,
                desc: desc,
                img: img,
                timeStamp: dateTime
            });
            setJournalId(docRef.id);
            console.log("Document written with ID: ", docRef.id, "and img url:",img);
            setTitle("");
            setDate("");
            setDescription("");
            setImg("");
            console.log('Document added successfully.');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <TextInput
                    style={{...styles.input, marginTop: 60}}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDate}
                    placeholder="Date"
                />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    textAlign="top"
                    style={{...styles.input}}
                    onChangeText={setDescription}
                    placeholder="Description"

                />

            </View>

            <View style={{alignItems: "center", paddingVertical: 15}}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 220, height: 120 }} />}
            </View>


            <View>

                <Pressable
                    onPress={pickImage}>
                    <View style={{...styles.login_button, backgroundColor: "#69B9AA"}}>
                        <Text style={styles.login_button_text}>Upload image</Text>
                    </View>
                </Pressable>

                <Pressable style={{marginTop: 40, marginBottom:60}}
                           onPress={handleCreateJournal}>
                    <View style={{...styles.login_button, backgroundColor: "#fff"}}>
                        <Text style={styles.login_button_text}>Create Journal</Text>
                    </View>
                </Pressable>
            </View>

        </ScrollView>
    );
}

export default Journal_create


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