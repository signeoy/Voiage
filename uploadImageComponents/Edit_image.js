import {
    Pressable,
    Text,
    View,
    ScrollView,
    Image
} from "react-native";

import React, { useState, useEffect} from "react";
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {uploadImageToFirebase} from "./uploadToStorage";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../style";

// scripts

const Edit_image = () => {
    const navigation = useNavigation();

    const route = useRoute();
    const { path, previousURL } = route.params || {};


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
        console.log("Edit image running with path", path);
        try {
            console.log("image url, img: ", imgURL);
            const docRef = doc(db, ...path.split(','));  // Create a reference to the document
            await updateDoc(docRef, {
                img: imgURL
            });
            console.log("Document updated successfully.");
            setImgURL("");
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleRemove = () => {
        setImageExists(false);
        setImgURL("");
        editImage(path, imgURL);
        navigation.goBack();
    }

    useEffect(() => {
        console.log("here is an image", previousURL)
        if (previousURL !== "") {
            setImgURL(previousURL);
        }
    }, []);

    return (
        <ScrollView>
            <View style={{alignItems: "center", marginTop:10}}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 220, height: 120 }} />}
            </View>

            <View style={{alignItems:"center"}}>
                <Pressable style={[globalStyles.button, {backgroundColor: "#69B9AA", marginTop: 20}]}
                           onPress={pickImage}>
                    <Text style={globalStyles.button_text}>Upload New Image</Text>
                </Pressable>
                <Pressable style={[globalStyles.button, {backgroundColor: "#69B9AA"}]}
                           onPress={handleRemove}>
                    <Text style={globalStyles.button_text}>Remove Image</Text>
                </Pressable>
                <Pressable style={globalStyles.button}
                           onPress={handleEdit}>
                    <Text style={globalStyles.button_text}>Confirm</Text>
                </Pressable>
            </View>
        </ScrollView>

    );

}


export default Edit_image


