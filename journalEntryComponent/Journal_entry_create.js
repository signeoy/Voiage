import {
    Pressable,
    Text,
    View,
    TextInput,
    ScrollView,
    Image
} from "react-native";

import React, { useState, useEffect} from "react";
import {auth, db} from "../firebaseConfig"
import { collection, addDoc} from "firebase/firestore"
import * as ImagePicker from 'expo-image-picker';

import {useRoute} from "@react-navigation/native";
import { uploadImageToFirebase } from "../uploadImageComponents/uploadToStorage"
import globalStyles from "../style";

// scripts

const Journal_entry_create = ({navigation}) => {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
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
            const dateTime = new Date().toLocaleString()
            const docRef = await addDoc(collection(db,"users",userId, "Journal", journal.id, "entry"), {
                title: title,
                text: text,
                img: img,
                timeStamp: dateTime
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
        <ScrollView>
            <View style={globalStyles.info}>
                <Text style={[globalStyles.text, {fontSize: 17}]}>
                    Add text or pictures to your journal and show off your travels!
                </Text>
            </View>

            <View>
                <TextInput
                    style={globalStyles.input}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={[globalStyles.input,{ height: 200}]}
                    onChangeText={setText}
                    placeholder="Text"
                    multiline={true}
                />

            </View>
            <View style={{alignItems: "center", paddingVertical: 15}}>
                {image && <Image source={{ uri: image.uri }} style={{ width: 220, height: 120 }} />}
            </View>


            <View>
                <Pressable
                    onPress={pickImage}>
                    <View style={[globalStyles.button, {backgroundColor: "#69B9AA"}]}>
                        <Text style={globalStyles.button_text}>Upload image</Text>
                    </View>
                </Pressable>

                <Pressable onPress={handleCreateEntry}>
                    <View style={[globalStyles.button]}>
                        <Text style={globalStyles.button_text}>Create entry</Text>
                    </View>
                </Pressable>
            </View>


        </ScrollView>
    );

}

export default Journal_entry_create