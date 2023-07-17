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
import { db } from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import ProfileComp from "./ProfileComp";

const Profile = ({navigation}) => {

    const [profileList, setProfileList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    //const navigation = useNavigation();
    const [username,setUsername] = useState("");

    const route = useRoute();
    const { id } = route.params;
    const { userId } = route.params;

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


    useEffect(() => {
        getProfileList();
    }, []);
    return (
        <View style={styles.container}>
            {/* Flatlist */}
            {profileList.length > 0 ? (
            <FlatList
                data={profileList}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { id: item.id, username: item.username, userId })}>

                    <ProfileComp
                        myUserId ={userId}
                        userId={item.id}
                        username={item.username}
                        setUsername={item.setUsername}
                        getProfileList={getProfileList}


                    />

                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            />
            ) : (
                <ActivityIndicator />
            )}

        </View>
    );

}

export default Profile


const styles = StyleSheet.create({
    todoItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',


    },
});