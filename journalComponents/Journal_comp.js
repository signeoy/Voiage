import {Pressable, StyleSheet, Text, View, TextInput, Image, Alert} from "react-native";
import React, { useState} from "react";

import {collection, deleteDoc, doc, getDocs, updateDoc, query} from "firebase/firestore";
import {db, auth} from "../firebaseConfig";

import globalStyles from "../style";

import {Entypo, MaterialIcons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
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

    const handleDelete = () => {
        Alert.alert(
            `All data belonging to the Journal will be lost. Proceed?`,
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('User canceled'),
                    style: 'cancel',
                },
                { text: 'Delete', onPress: () => deleteFunction() },
            ],
            { cancelable: false }
        );
    }

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
                        <View style={styles.container_with_img}>
                            <View style={{width:'50%', flexDirection:'column'}}>
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
                                <View style={[styles.icons, {flexDirection: "row", marginRight:3}]}>
                                    <Pressable onPress={() => handleSaveButton()}>
                                        <MaterialIcons name={"save"} size={24} color="#00000091"/>
                                    </Pressable>
                                    {props.img === "" && (
                                        <Pressable onPress={() => navigation.navigate('Edit Image', {
                                            path: `users/${userId}/Journal/${props.id}`,
                                            previousURL: ""
                                        })}>
                                            <Entypo name="image-inverted" size={24} color="#00000091"/>
                                        </Pressable>
                                    )}
                                    {props.img !== "" &&(
                                        <Pressable onPress={() => navigation.navigate('Edit Image', {path: `users/${userId}/Journal/${props.id}`, previousURL: props.img})}>
                                            <Entypo name="image-inverted" size={24} color="#00000091"/>
                                        </Pressable>
                                    )}
                                    <Pressable onPress={handleCancelButton}>
                                        <MaterialIcons name="cancel" size={24} color="#00000091"/>
                                    </Pressable>

                                </View>
                            </View>
                            {props.img !== "" ? (
                                <Pressable onPress={() => navigation.navigate('Edit Image', {  path: `users/${userId}/Journal/${props.id}`, previousURL: props.img})}>
                                    <Image
                                        source={{uri: props.img}}
                                        style={{ width: windowWidth*0.5, height: '100%' }}
                                        resizeMode="cover"
                                        onError={(error) => console.log("Error loading image")}
                                    />
                                </Pressable>
                            ): null}
                        </View>

                    ) : (

                            <View style={styles.container_with_img}>
                                <View style={{width:'50%'}}>
                                    <Text style={globalStyles.journal_title}>{props.title}</Text>
                                    <View style={globalStyles.line}></View>
                                    <Text style={globalStyles.journal_date}>{props.date}</Text>
                                    <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                                    <View style={[styles.icons, {flexDirection: "row", marginRight:3}]}>
                                        <Pressable onPress={() => handleEditButton()}>
                                            <MaterialIcons name={"edit"} size={24} color="#00000091"/>
                                        </Pressable>
                                        <Pressable onPress={handleDelete}>
                                            <MaterialIcons name="delete" size={24} color="#00000091"/>
                                        </Pressable>

                                    </View>
                                </View>
                                {props.img !== "" ? (
                                    <Image
                                        source={{uri: props.img}}
                                        style={{ width: windowWidth*0.5, height: '100%' }}
                                        resizeMode="cover"
                                        onError={(error) => console.log("Error loading image")}
                                    />
                                ): null}
                            </View>



                    )}
                </View>
            ) : (
                props.img !== "" ? (
                    <View style={styles.container_with_img}>
                        <View style={{width:'50%'}}>
                            <Text style={globalStyles.journal_title}>{props.title}</Text>
                            <View style={globalStyles.line}></View>
                            <Text style={globalStyles.journal_date}>{props.date}</Text>
                            <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                        </View>
                        <Image
                            source={{ uri: props.img }}
                            style={{ width: windowWidth*0.5, height: '100%' }}
                            resizeMode="cover"
                            onError={(error) => console.log("Error loading image")}
                        />
                    </View>
                ) : (
                    <View style={styles.container_with_img}>
                        <View style={{width:'50%'}}>
                            <Text style={globalStyles.journal_title}>{props.title}</Text>
                            <View style={[globalStyles.line]}></View>
                            <Text style={globalStyles.journal_date}>{props.date}</Text>
                            <Text style={globalStyles.journal_desc}>{props.desc}</Text>
                        </View>
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
        width: "100%",
        marginVertical: 10,
    },
    container_with_img:{
        flexDirection:"row",
        width:"100%",
        height: 215
    },
    icons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 10,
        right:10,
    },
});