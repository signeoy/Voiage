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
import * as ImagePicker from "expo-image-picker";
import {uploadImageToFirebase} from "./uploadToStorage";

// scripts

const Edit_image = ({navigation}) => {

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const route = useRoute();
    const { path } = route.params || {};


    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState("");

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

    const uploadImage = async () => {
        try {
            const downloadURL = await uploadImageToFirebase(image.uri);
            console.log('Download URL:', downloadURL);

            setImgURL(downloadURL);
            setImage(null); // Reset image state

            // Use a setTimeout to wait for the state update to complete
            setTimeout(() => {
                editImage(path, downloadURL).then(r => {
                    // Use navigation.goBack() to navigate back to the previous screen
                    navigation.goBack();
                });
            }, 0);
        } catch (e) {
            console.error("Error uploading image", e);
        }
    };

    const handleEdit = async () => {
        try {
            if (imageExists) {
                console.log("image exists")
                await uploadImage();
                navigation.navigate('Journal Editor', { userId });
            } else {
                console.log("image does NOT exist")
                await editImage(path, imgURL);
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error handling entry creation:', error);
        }
    }

    const editImage = async (path, imgURL) => {
        try {
            console.log("image url, img: ", imgURL);
            const docRef = await addDoc(collection(path), {
                img: imgURL
            });
            //setJournalId(docRef.id);
            console.log("Document written with ID: ", docRef.id);
            setImgURL("");
            console.log('Document added successfully.');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };


    return (
        <ScrollView>
            <View style={{alignItems: "center", paddingVertical: 15}}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 320, height: 160 }} />}
            </View>

            <View>
                <Pressable style={{marginTop: 10}}
                           onPress={pickImage}>
                    <Text >Upload New Image</Text>
                </Pressable>
                <Pressable style={{marginTop: 10}}
                           onPress={() => navigation.navigate('Register')}>
                    <Text >Remove Image</Text>
                </Pressable>
                <Pressable style={{marginTop: 10}}
                           onPress={handleEdit}>
                    <Text >Confirm</Text>
                </Pressable>
            </View>
        </ScrollView>

    );

}


export default Edit_image


