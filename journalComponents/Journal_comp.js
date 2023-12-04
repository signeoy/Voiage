import {Button, Pressable, StyleSheet, Text, View, TextInput, Image} from "react-native";
import React, { useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";

import {collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query} from "firebase/firestore";
import {db, auth} from "../firebaseConfig";
import {MaterialIcons} from "@expo/vector-icons";
import globalStyles from "../style";

const Journal_comp = (props) => {
    const [title, setTitle] = useState(props.title);
    const [date, setDate] = useState(props.date);
    const [desc, setDesc] = useState(props.desc);

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

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
        setDate(props.date);
        setDesc(props.desc);
    };

    const deleteFunction = async () => {
        try{
            console.log("deletefunction running", props.id)
            await deleteCollection();
            await deleteDoc(doc(db, "users", userId, "Journal", props.id));
            props.getJournalList()
        } catch (e) {
            console.log("error trying to delete: ", e)
        }
    }

    async function deleteCollection() {
        const q = query(collection(db, "users", userId, "Journal", props.id, "entry"));
        const querySnapshot = await getDocs(q);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });

        Promise.all(deleteOps).then(() => console.log('documents deleted'))
    }

    return (
        <View style={styles.container}>
            {userId === props.profileId ? (
                <View>
                    {isEditing ? (
                        <View>
                            <TextInput
                                style={globalStyles.journal_title}
                                value={title}
                                onChangeText={text => setTitle(text)}
                            />
                            <View style={globalStyles.line}></View>
                            <TextInput
                                style={globalStyles.journal_date}
                                value={date}
                                onChangeText={text => setDate(text)}
                            />
                            <TextInput
                                style={globalStyles.journal_desc}
                                value={desc}
                                onChangeText={text => setDesc(text)}
                            />
                            {props.img !== "" ? (
                                <View>
                                    <Image
                                        source={{uri: props.img}}
                                        style={{width: 200, height: 100}}
                                        onError={(error) => console.log("Error loading image")}
                                    />
                                </View>
                            ): null}
                        </View>

                    ) : (

                            <View style={styles.container_with_img}>
                                <View style={{width:'100%'}}>
                                    <Text style={globalStyles.journal_title}>{props.title}</Text>
                                    <View style={globalStyles.line}></View>
                                    <Text style={globalStyles.journal_date}>{props.date}</Text>
                                    <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                                </View>
                                {props.img !== "" ? (
                                    <View>
                                        <Image
                                            source={{uri: props.img}}
                                            style={{width: 200, height: 100}}
                                            onError={(error) => console.log("Error loading image")}
                                        />
                                    </View>
                                ): null}
                            </View>



                    )}

                    <View style={[styles.icons, {flexDirection: "row", marginRight:3}]}>
                        <Pressable onPress={() => isEditing ? handleSaveButton() : handleEditButton()}>
                            <MaterialIcons name={isEditing ? "save" : "edit"} size={20} color="#00000091"/>
                        </Pressable>

                        {isEditing && (
                            <Pressable onPress={handleCancelButton}>
                                <MaterialIcons name="cancel" size={20} color="#00000091"/>
                            </Pressable>
                        )}

                        <Pressable onPress={deleteFunction}>
                            <MaterialIcons name="delete" size={20} color="#00000091"/>
                        </Pressable>

                    </View>

                </View>
            ) : (
                props.img !== "" ? (
                    <View>
                        <Image
                            source={{ uri: props.img }}
                            style={{ width: 200, height: 100 }}
                            onError={(error) => console.log("Error loading image")}
                        />

                        <Text style={globalStyles.journal_title}>{props.title}</Text>
                        <View style={globalStyles.line}></View>
                        <Text style={globalStyles.journal_date}>{props.date}</Text>
                        <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                    </View>
                ) : (
                    <View style={{width:'100%'}}>
                        <Text style={globalStyles.journal_title}>{props.title}</Text>
                        <View style={[globalStyles.line, {width: '100%'}]}></View>
                        <Text style={globalStyles.journal_date}>{props.date}</Text>
                        <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                    </View>
                )

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
    journal_btn: {
        width: "30%",

    },
    container_with_img:{
        flexDirection:"row",
        width:"100%",
        alignContent:"space-between"
    },
    icons:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});