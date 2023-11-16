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
import * as ImagePicker from 'expo-image-picker';

import {useRoute} from "@react-navigation/native";
import { uploadImageToFirebase } from "../uploadImageComponents/uploadToStorage"

// scripts

const Journal_entry_create = ({navigation}) => {

    const [title, setTitle] = useState("Test");
    const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi architecto aut blanditiis consequatur cumque delectus, dolore enim explicabo ipsa laboriosam nesciunt obcaecati possimus quod rerum sequi temporibus ut voluptatem!");
    //const navigation = useNavigation();

    const route = useRoute();
    const { journal } = route.params;

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const [image, setImage] = useState(null);
    const [img, setImg] = useState("");
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
            console.log('Download URL:', downloadURL);

            setImg(downloadURL);
            setImage(null); // Reset image state

            // Use a setTimeout to wait for the state update to complete
            setTimeout(() => {
                createEntry(title, text, downloadURL).then(r => navigation.navigate('Journal Editor', {userId, journal}));
            }, 0);
        } catch (e) {
            console.error("Error uploading image", e);
        }
    };


    const handleCreateEntry = async () => {
        try {
            if (imageExists) {
                console.log("image exists")
                await uploadImage();
                navigation.navigate('Journal Editor', { userId, journal });
            } else {
                console.log("image does NOT exist")
                await createEntry(title, text, img);
                navigation.navigate('Journal Editor', { userId, journal });
            }
        } catch (error) {
            console.error('Error handling entry creation:', error);
        }
    }


    const createEntry = async (title, text, img) => {
        try {
            console.log("image url, img: ", img);
            const docRef = await addDoc(collection(db,"users",userId, "Journal", journal.id, "entry"), {
                title: title,
                text: text,
                img: img
            });
            //setJournalId(docRef.id);
            console.log("Document written with ID: ", docRef.id);
            setTitle("");
            setText("");
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
            <View style={{alignItems: "center", paddingVertical: 15}}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 320, height: 160 }} />}
            </View>


            <View>
                <Pressable
                    onPress={pickImage}>
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