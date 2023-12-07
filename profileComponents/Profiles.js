import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList
} from "react-native";

import React, { useState, useEffect} from "react";
import { db, auth } from "../firebaseConfig"
import { getDocs, query, collection, where} from "firebase/firestore"

// scripts
import ProfileComp from "./ProfileComp";
import globalStyles from "../style";

const Profile = ({navigation}) => {

    const [profileList, setProfileList] = useState([]);
    const [search, setSearch] = useState("");

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const getProfileList = async () => {

        try{
            let querySnapshot;
            if (search == null || search === "") {
                querySnapshot = await getDocs(query(collection(db,"users")));
            }
            else {
                const searchLowerCase = search.toLowerCase();
                const startAtValue = searchLowerCase;
                const endAtValue = searchLowerCase + "\uf8ff";

                querySnapshot = await getDocs(
                    query(
                        collection(db, "users"),
                        where("usernameLowerCase", ">=", startAtValue),
                        where("usernameLowerCase", "<=", endAtValue)
                    )
                );
            }
            const profiles = querySnapshot.docs
                .filter((doc) => doc.id !== userId) // Exclude the logged-in user
                .map((doc) => ({ ...doc.data(), id: doc.id }));

            setProfileList(profiles);
        } catch (error) {
            console.error("Error getting Profile list: ", error);
        }
    };

    useEffect(() => {
        getProfileList();
    }, [search]);

    return (
        <View style={[styles.container, {marginBottom:20}]}>
            <TextInput
                style={[styles.input, {marginBottom:20}]}
                onChangeText={setSearch}
                placeholder="Search for profiles... "
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
                <Text style={[globalStyles.text,{marginTop: 20} ]}>
                    No users found
                </Text>
                // <ActivityIndicator />
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
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        flexDirection: "row",
        borderStyle: "solid",
        margin: 1,
        borderWidth: 1,
        borderColor: "#9DBBB5",
        marginTop:20,
        fontFamily: "Imprima-Regular",
    },
});