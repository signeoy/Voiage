import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db } from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, addDoc, collection, getDocs, query} from "firebase/firestore"
import {useRoute} from "@react-navigation/native";


const ProfileComp = (props) => {
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [profileList, setProfileList] = useState([]);

    const route = useRoute();
    const { userId } = route.params;


    //const [isEditing, setIsEditing] = useState(false);
    //const [updated_profileName, setUpdated_profileName] = useState(props.profileName);

    const updateIsChecked = async () => {
        //const taskRef = doc(db,"TodoLists", userId, "todo", props.id);

// Set the "capital" field of the city 'DC'
//         await updateDoc(taskRef, {
//             isChecked: isChecked,
//         });

        if (isChecked){
            addFavourite()
        }
    };

    useEffect(() => {
        updateIsChecked();
    },[isChecked]);





    const getProfileList = async () => {

        try {

            const querySnapshot = await getDocs(query(collection(db,"users")));
            const profiles = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            console.log("profiles:", profiles); // log the todo items to check if they are being fetched correctly
            setProfileList(profiles);
        } catch (error) {
            console.error("Error getting todo list: ", error);
        }
    };


    const addFavourite = async () => {

        try {
            const docRef = await addDoc(collection(db,"users", userId, "favourites"), {
                username: props.username
            });

            console.log("Document written with ID: ", docRef.id);
            props.setUsername("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getProfileList();
    };


    useEffect(() => {
        getProfileList();
    }, []);

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