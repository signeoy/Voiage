import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ActivityIndicator
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import Journal_print from "../journalComponents/Journal_print";

const MyProfilePage = ({navigation}) => {
    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const route = useRoute();
    const { journals } = route.params;

    const [username, setUsername] = useState("");
    const docRef = doc(db, 'users', userId);

// Retrieve the document using getDoc
    const getUsername = () =>{
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    setUsername(docSnapshot.data().username);
                    console.log(`Username for userId ${userId}: ${username}`);

                    // Continue your logic here with the username
                } else {
                    console.log(`User with userId ${userId} not found.`);
                }
            })
            .catch((error) => {
                console.error('Error getting user:', error);
            });
    }

    useEffect(() => {
        getUsername();
    }, []);

    useEffect(() => {
        console.log("Test My profile")
    });

    return (
        <View >

            <View style = {{flexDirection : "row", padding: 15}}>

                <View style={{flex: 1, padding:20}}>
                    <Pressable onPress={() => navigation.navigate('Add Journal', { userId })}>
                        <View style={{ ...styles.profile_btn, backgroundColor: "#FCF6BE" }}>
                            <Text style={styles.profile_btn_txt}>Add Journal</Text>
                        </View>
                    </Pressable>


                </View>
                <View style = {{flex:2, }}>
                    <Text style={styles.profile_name}
                    >{username}</Text>
                </View>

            </View>

            <View>
                <Journal_print navigation={navigation} profileId={userId}/>
            </View>
        </View>
    );

}

export default MyProfilePage


const styles = StyleSheet.create({

    profile_btn:{
        justifyContent: "space-between",
        padding: 8,
        //flex: 1,
        alignSelf: "center",
        marginVertical: 0,
        marginBottom: 0,
        elevation: 30,
        width: "100%",
        //boarder
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    profile_btn_txt:{
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    profile_name:{
        fontSize: 40,
        margin: 20,
        flex: 3
    },
});