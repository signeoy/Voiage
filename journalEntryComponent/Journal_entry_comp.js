import { Button, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Journal_entry_comp = (props) => {
    const [entryTitle, setEntryTitle] = useState(props.title);
    const [entryText, setEntryText] = useState(props.text);

    const route = useRoute();
    const { userId } = route.params;

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
                    // Add other fields to update as needed
                });
                setIsEditing(false);
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
        setEntryTitle(entryTitle);
        setEntryText(entryText);
    };

    const deleteFunction = () => {
        console.log("delete function run");
    };

    return (
        <View style={styles.container}>
            {userId === props.profileId ? (
                <View>
                    <View style={{ flexDirection: "row" }}>
                        {isEditing ? (
                            <TextInput
                                style={styles.titleInput} // Use a different style for input fields
                                value={entryTitle}
                                onChangeText={text => setEntryTitle(text)}
                            />
                        ) : (
                            <Text style={styles.title}>{entryTitle}</Text>
                        )}

                        <View style={{ flexDirection: "row" }}>
                            <Pressable onPress={() => isEditing ? handleSaveButton() : handleEditButton()}>
                                <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="black" />
                            </Pressable>

                            {isEditing && (
                                <Pressable onPress={handleCancelButton}>
                                    <MaterialIcons name="cancel" size={24} color="black" />
                                </Pressable>
                            )}

                            <Pressable onPress={deleteFunction}>
                                <MaterialIcons name="delete" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>

                    {isEditing ? (
                        <TextInput
                            style={styles.title} // Use a different style for input fields
                            value={entryText}
                            onChangeText={text => setEntryText(text)}
                            multiline={true} // Enable multiline input
                            numberOfLines={6}
                        />
                    ) : (
                        <Text style={styles.title}>{entryText}</Text>
                    )}
                </View>
            ) : (
                <View>
                    <Text style={styles.title}>{entryTitle}</Text>
                    <Text style={styles.title}>{entryText}</Text>
                </View>
            )}
        </View>
    );
};

export default Journal_entry_comp;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
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
    titleInput: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: "500",
    },
});
