import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, addDoc, collection, getDocs, query, where} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";


const ProfileComp = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState(props.username);

    const route = useRoute();
    const { userId } = route.params;

    //const [isEditing, setIsEditing] = useState(false);
    //const [updated_profileName, setUpdated_profileName] = useState(props.profileName);


    const addFavourite = async (username) => {

        try {
            const querySnapshot = await getDocs(query(collection(db, "users", userId, "favourites"), where("username", "==", username)));
            if (querySnapshot.empty) {
                const docRef = await addDoc(collection(db,"users", userId, "favourites"), {
                    username: username
                });

                console.log("Document written with ID: ", docRef.id);
                setUsername("");
                await props.getProfileList();
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }

    };

    const deleteFavourite = async (username) => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "users", userId, "favourites"), where("username", "==", username)));
            if (!querySnapshot.empty) {
                const docToDelete = querySnapshot.docs[0];
                await deleteDoc(docToDelete.ref);
                console.log("Document deleted with username: ", username);
            }
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
        await props.getProfileList();
    };

    const updateIsChecked = async () => {
        if (isChecked) {
            await addFavourite(props.username);
        } else if (!isChecked) {
            await deleteFavourite(props.username);
        }
    };

    useEffect(() => {
        updateIsChecked();
    },[isChecked]);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{props.username}</Text>

            {/* checked icon */}
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
            </Pressable>


        </View>
    );

}

export default ProfileComp

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: "500",
    },
});