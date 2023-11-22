import {Button, Pressable, StyleSheet, Text, View, TextInput, Image} from "react-native";
import React, { useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";

import {collection, deleteDoc, doc, getDocs, updateDoc, getDoc, query} from "firebase/firestore";
import {db, auth} from "../firebaseConfig";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const Journal_comp = (props) => {
    const navigation = useNavigation();


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
                            <View>
                                <TextInput
                                    style={styles.title}
                                    value={title}
                                    onChangeText={text => setTitle(text)}
                                />
                                <TextInput
                                    style={styles.title}
                                    value={date}
                                    onChangeText={text => setDate(text)}
                                />
                                <TextInput
                                    style={styles.title}
                                    value={desc}
                                    onChangeText={text => setDesc(text)}
                                />
                            </View>
                            {props.img !== "" ? (
                                <Pressable onPress={() => navigation.navigate('Edit Image', {  path: `users/${userId}/Journal/${props.id}`, previousURL: props.img})}>
                                    <Image
                                        source={{uri: props.img}}
                                        style={{width: 200, height: 200}}
                                        onError={(error) => console.log("Error loading image")}
                                    />
                                </Pressable>
                            ): null}
                        </View>

                    ) : (

                            <View style={styles.container_with_img}>
                                <View>
                                    <Text style={styles.title}>{props.title}</Text>
                                    <Text style={styles.title}>{props.date}</Text>
                                    <Text style={styles.title}>{props.desc}</Text>
                                </View>
                                {props.img !== "" ? (
                                    <View>
                                        <Image
                                            source={{uri: props.img}}
                                            style={{width: 200, height: 200}}
                                            onError={(error) => console.log("Error loading image")}
                                        />
                                    </View>
                                ): null}
                            </View>



                    )}


                    <View style={{flexDirection: "row"}}>
                        <Pressable onPress={() => isEditing ? handleSaveButton() : handleEditButton()}>
                            <MaterialIcons name={isEditing ? "save" : "edit"} size={24} color="black"/>
                        </Pressable>

                        {isEditing && (
                            <View>
                                <Pressable onPress={handleCancelButton}>
                                    <MaterialIcons name="cancel" size={24} color="black"/>
                                </Pressable>
                                {props.img === "" && (
                                    <Pressable onPress={() => navigation.navigate('Edit Image', {  path: `users/${userId}/Journal/${props.id}`, previousURL: ""})}>
                                        <Entypo name="image-inverted" size={24} color="black" />
                                    </Pressable>
                                )}

                            </View>

                        )}

                        <Pressable onPress={deleteFunction}>
                            <MaterialIcons name="delete" size={24} color="black"/>
                        </Pressable>
                    </View>

                </View>
            ) : (
                props.img !== "" ? (
                    <View>
                        <View>
                            <Image
                                source={{ uri: props.img }}
                                style={{ width: 200, height: 200 }}
                                onError={(error) => console.log("Error loading image")}
                            />
                        </View>
                        <View>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.title}>{props.date}</Text>
                            <Text style={styles.title}>{props.desc}</Text>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.title}>{props.date}</Text>
                        <Text style={styles.title}>{props.desc}</Text>
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
    title: {
        flex: 1,
        margin: 10,
        fontSize: 17,
    },
    journal_btn: {
        width: "30%",

    },
    container_with_img:{
        flexDirection:"row",
        width:"100%",
        alignContent:"space-between"
    }
});