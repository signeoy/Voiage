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
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import ProfileComp from "./ProfileComp";

const Profile = ({navigation}) => {

    const [profileList, setProfileList] = useState([]);
    const [search, setSearch] = useState("");
    //const navigation = useNavigation();
    const [username,setUsername] = useState("");

    const route = useRoute();
    const { id } = route.params;
    const { userId } = route.params;

    const getProfileList = async () => {

        if (search == null || search === ""){
            try {

                const querySnapshot = await getDocs(query(collection(db,"users")));
                const profiles = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
                console.log("profiles:", profiles); // log the todo items to check if they are being fetched correctly
                setProfileList(profiles);
            } catch (error) {
                console.error("Error getting todo list: ", error);
            }
        }

        else {
            console.log("search used: ", search);
            try {
                const querySnapshot = await getDocs(
                    query(collection(db, "users"), where("username", ">=", search))
                );
                const profiles = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setProfileList(profiles);
            } catch (error) {
                console.error("Error getting todo list: ", error);
            }
        }
    };

    useEffect(() => {
        getProfileList();
    }, [search]);
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setSearch}
                placeholder="search"
            />
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
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    input: {
        color: "#030303",
        fontSize: 25,
        backgroundColor: "#FFFFFF",
        padding: 7,
        width: "80%",
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
});