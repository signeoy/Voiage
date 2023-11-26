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
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import Journal_print from "../journalComponents/Journal_print";
import globalStyles from "../style";

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
        <View style={globalStyles.screen}>
            <View style={{flexDirection: "row"}}>
                <View style = {{flexDirection : "column", flex: 2, padding: 15}}>
                    <View style = {{flex:1, }}>
                        <Text style={styles.profile_name}
                        >{username}</Text>
                    </View>
                    <View style={{flex: 1, marginLeft: 15}}>
                        <Pressable onPress={() => navigation.navigate('Add Journal', { userId })}>
                            <View style={{ ...styles.profile_btn, flexDirection: "row" }}>
                                <FontAwesome name="plus" size={24} color="#6C6C6C" />
                                <Text style={styles.profile_btn_txt}>Add Journal</Text>
                            </View>
                        </Pressable>
                    </View>


                </View>
                <View style = {styles.profile_photo}>
                    <Text style={{fontFamily: "Imprima-Regular"}}>
                        Profile{'\n'}photo here
                    </Text>
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
        padding: 8,
        alignSelf: "center",
        elevation: 30,
        width: "100%",
        //boarder
    },
    profile_btn_txt:{
        fontSize: 15,
        color: '#6C6C6C',
        marginHorizontal: 5,
        fontFamily: "Imprima-Regular",
    },
    profile_name:{
        fontSize: 30,
        margin: 20,
        flex: 3,
        color: '#000000B2',
        //fontWeight: 400,
        fontStyle: 'normal',
        fontFamily: "Imprima-Regular",
    },
    profile_photo:{
        margin:30,
        padding: 10,
        width:100,
        height:100,
        borderWidth:10,
        borderColor:'#54BDA5',
        borderRadius: 20,
        backgroundColor: '#f3f3f3',

    }
});