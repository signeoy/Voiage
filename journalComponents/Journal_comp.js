import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";

import deleteJournal from "../journalComponents/Journal_delete";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {MaterialIcons} from "@expo/vector-icons";

const Journal_comp = (props) => {
    const [title, setTitle] = useState(props.title);
    const [date, setDate] = useState(props.date);
    const [desc, setDesc] = useState(props.desc);

    const route = useRoute();
    const {userId} = route.params;

    const [isEditing, setIsEditing] = useState(false);

    const handleEditButton = () => {
        setIsEditing(true);
        console.log("edit run")
    };

    const handleSaveButton = async () => {
        if (props.id != null) {
            const todoRef = doc(db, "users", userId, "Journal", props.id);
            await updateDoc(todoRef, {
                title: title,
                date: date,
                desc: desc
                // Add other fields to update as needed
            });
            setIsEditing(false);
            props.getJournalList();
            console.log("save edit run with id: ", props.id)
        } else {
            console.log("save edit failed")
            // Handle the case where journalId is not available
        }
    };

    const handleCancelButton = () => {
        setIsEditing(false);
        setTitle(props.title);
    };

    const handleTextChange = (text) => {
        console.log("edit text run")
        setTitle(text);
    };

    const deleteFunction = () => {
        console.log("delete function run")
    }


    return (
        <View style={styles.container}>
            {userId === props.profileId ? (
                <View>
                    {isEditing ? (
                        <View>
                            <TextInput
                                style={styles.title}
                                value={title}
                                onChangeText={handleTextChange}
                            />
                            <TextInput
                                style={styles.title}
                                value={date}
                                onChangeText={handleTextChange}
                            />
                            <TextInput
                                style={styles.title}
                                value={desc}
                                onChangeText={handleTextChange}
                            />
                        </View>

                    ) : (
                        <View>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.title}>{props.date}</Text>
                            <Text style={styles.title}>{props.desc}</Text>
                        </View>
                    )}


                    <View style={{flexDirection: "row"}}>
                        <Pressable onPress={() => isEditing ? handleSaveButton() : handleEditButton()}>
                            <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="black"/>
                        </Pressable>

                        {isEditing && (
                            <Pressable onPress={handleCancelButton}>
                                <MaterialIcons name="cancel" size={24} color="black"/>
                            </Pressable>
                        )}

                        <Pressable onPress={deleteFunction}>
                            <MaterialIcons name="delete" size={24} color="black"/>
                        </Pressable>
                    </View>

                </View>
            ) : (
                <View>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.title}>{props.date}</Text>
                    <Text style={styles.title}>{props.desc}</Text>
                </View>
            )}
        </View>
    );
}

export default Journal_comp

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
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
    journal_btn: {
        width: "30%",

    },
});