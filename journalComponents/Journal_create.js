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
import globalStyles from "../style";


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
            const docRef = await addDoc(collection(db,"users", userId, "Journal"), {
                title: title,
                date: date,
                desc: desc,
                img: img
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
            <View style={globalStyles.info}>
                <Text style={[globalStyles.text, {fontSize: 17}]}>
                    Customize your own journal with a unique title and description.{'\n'}
                    {'\n'}Upload a picture from the trip to complete your Travel Journal thumbnail!
                </Text>
            </View>
            <View>
                <TextInput
                    style={[globalStyles.input, {marginTop: 10}]}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={globalStyles.input}
                    onChangeText={setDate}
                    placeholder="Date"
                />
                <TextInput
                    multiline={true}
                    numberOfLines={3}
                    textAlign="top"
                    style={[globalStyles.input, {height: 100}]}
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
                    <View style={[globalStyles.button, { backgroundColor: "#69B9AA"}]}>
                        <Text style={globalStyles.button_text}>Upload image</Text>
                    </View>
                </Pressable>

                <Pressable style={{marginBottom:60}}
                           onPress={handleCreateJournal}>
                    <View style={globalStyles.button}>
                        <Text style={globalStyles.button_text}>Create Journal</Text>
                    </View>
                </Pressable>
            </View>

        </ScrollView>
    );
}

export default Journal_create
