import {Button, Pressable, StyleSheet, Text, View, TextInput, Image} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import {collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "../style";


const Journal_entry_comp = (props) => {
    const navigation = useNavigation();

    const [entryTitle, setEntryTitle] = useState(props.title);
    const [entryText, setEntryText] = useState(props.text);

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButton = () => {
        setIsEditing(true);
        console.log("edit run");
    };

    const handleSaveButton = async () => {
        console.log("save edit run with id: ", props.id);

        try {
            if (props.id != null) {
                const todoRef = doc(
                    db,
                    "users",
                    userId,
                    "Journal",
                    props.journalId,
                    "entry",
                    props.id
                );
                await updateDoc(todoRef, {
                    title: entryTitle,
                    text: entryText,
                });
                setIsEditing(false);
                props.getEntryList();
                console.log("Save edit successful with id: ", props.id);
            } else {
                console.log("Save edit failed - missing id");
                // Handle the case where the journal entry id is not available
            }
        } catch (error) {
            console.error("Error while saving: ", error);
            // Handle the error, e.g., show an error message to the user
        }
    };

    const handleCancelButton = () => {
        console.log("action cancelled");
        setIsEditing(false);
        setEntryTitle(props.title);
        setEntryText(props.text);
    };



    const deleteEntry = async () => {
        try {
            console.log("delete triggered", props.id)
            const querySnapshot = await getDocs(collection(db,"users", userId, "Journal", props.journalId, "entry"));
            for (const docSnap of querySnapshot.docs) {
                await deleteDoc(doc(db,"users", userId, "Journal", props.journalId, "entry", props.id));
            }
            props.getEntryList();
        } catch (error) {
            console.error("Error deleting entry list: ", error);
        }
    };

    return (
        <View style={styles.container}>
            {userId === props.profileId ? (
                <View>
                    <View style={{ flexDirection: "row" }}>
                        {isEditing ? (
                            <TextInput
                                style={globalStyles.entryTitle}
                                value={entryTitle}
                                onChangeText={text => setEntryTitle(text)}
                            />
                        ) : (
                            <Text style={globalStyles.entryTitle}>{props.title}</Text>
                        )}

                        <View style={{ flexDirection: "row" }}>
                            <Pressable onPress={() => isEditing ? handleSaveButton() : handleEditButton()}>
                                <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="black" />
                            </Pressable>

                            {isEditing && (
                                <View>

                                    <Pressable onPress={handleCancelButton}>
                                        <MaterialIcons name="cancel" size={24} color="black" />
                                    </Pressable>
                                    {props.img === "" && (
                                        <Pressable onPress={() => navigation.navigate('Edit Image', {  path: `users/${userId}/Journal/${props.journalId}/entry/${props.id}`, previousURL: ""})}>
                                            <Entypo name="image-inverted" size={24} color="black" />
                                        </Pressable>
                                    )}
                                </View>

                            )}

                            <Pressable onPress={deleteEntry}>
                                <MaterialIcons name="delete" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {isEditing ? (
                            <View>
                                <TextInput
                                    style={globalStyles.entryDesc}
                                    value={entryText}
                                    onChangeText={text => setEntryText(text)}
                                    multiline={true}
                                    numberOfLines={6}
                                />
                                {props.img !== "" ? (
                                    <Pressable onPress={() => navigation.navigate('Edit Image', {  path: `users/${userId}/Journal/${props.journalId}/entry/${props.id}`, previousURL: ""})}>
                                        <Image
                                            source={{uri: props.img}}
                                            style={{width: 320, height: 220, borderRadius:10, marginBottom:30}}
                                            onError={(error) => console.log("Error loading image")}
                                        />
                                    </Pressable>
                                ): null}
                            </View>

                    ) : (
                        <View>
                            <Text style={globalStyles.entryDesc}>{props.text}</Text>
                            {props.img !== "" ? (
                                <View  style={{alignItems:"center"}}>
                                    <Image
                                        source={{uri: props.img}}
                                        style={{width: 320, height: 220, borderRadius:10, marginBottom:30}}
                                        onError={(error) => console.log("Error loading image",error)}
                                    />
                                </View>
                            ): null}
                        </View>


                    )}
                </View>
            ) : (
                <View>
                    <Text style={globalStyles.entryTitle}>{entryTitle}</Text>
                    <Text style={globalStyles.entryDesc}>{entryText}</Text>
                    {props.img !== "" ? (
                        <View style={{alignItems:"center"}}>
                            <Image
                                source={{uri: props.img}}
                                style={{width: 320, height: 220, borderRadius:10, marginBottom:30}}
                                onError={(error) => console.log("Error loading image")}
                            />
                        </View>
                    ): null}
                </View>
            )}
        </View>
    );
};

export default Journal_entry_comp;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FBCCB3",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
        alignSelf: "center",
        zIndex:2,
        borderBottomColor:'#FFFFFF66',
        borderBottomWidth:3
    },
    title: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: '500',
    },
    titleInput: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: '500',
    },
});
