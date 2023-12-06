import {signOut, deleteUser} from "firebase/auth";
import {auth, db} from "../firebaseConfig";

import React, { useState } from 'react';

import globalStyles from "../style";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert} from 'react-native';
import {collection, deleteDoc, doc, getDoc, getDocs, query, where} from "firebase/firestore";

const Logout = ({navigation, setUser}) => {
    const user = auth.currentUser;
    const userId = user.uid;
    const logoutUser = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log(`User has been signed out`);
            navigation.navigate('Login')
        }).catch((error) => {
            // An error happened.
            console.log(`Error: ${error.code} ${error.message}`);
        });
    }

    const handleDelete = () => {
        Alert.alert(
            'You are trying to delete your user',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('User canceled'),
                    style: 'cancel',
                },
                { text: 'Confirm', onPress: () => deleteUserSubcollections() },
            ],
            { cancelable: false }
        );
    }

    const deleteAccount = async () => {
        deleteUser(user).then(async () => {
            //user deleted, navigate to login screen
            navigation.navigate('Login')
        }).catch((error) => {
            // An error ocurred
            console.log(`Error: ${error.code} ${error.message}`);
        });
    };

    async function deleteUserSubcollections() {
        try {
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const journalsCollectionRef = collection(userDocRef, "Journal");
                const journalsQuerySnapshot = await getDocs(journalsCollectionRef);

                const deleteOps = [];

                journalsQuerySnapshot.forEach((journalDoc) => {
                    const entriesCollectionRef = collection(journalDoc.ref, "entries");
                    deleteOps.push(deleteCollection(entriesCollectionRef));
                    deleteOps.push(deleteDoc(journalDoc.ref));
                });

                await Promise.all(deleteOps);
                console.log('All journals and entries deleted successfully');
                await deleteDoc(doc(db, "users", userId));
                console.log('user document deleted successfully');
                await deleteAccount()
            } else {
                console.log('User document not found');
            }
        } catch (error) {
            console.error('Error deleting journals and entries:', error);
        }
    }

// Helper function to delete an entire collection
    async function deleteCollection(collectionRef) {
        const querySnapshot = await getDocs(collectionRef);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });

        await Promise.all(deleteOps);
    }




    return(
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[globalStyles.settingButton]} onPress={handleDelete}>
                  <AntDesign name="delete" size={24} color="black" />
                    <Text style={globalStyles.settingButton_text}>Delete User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.settingButton } onPress={logoutUser}>
                    <Entypo name="log-out" size={24} color="black" />
                    <Text style={globalStyles.settingButton_text}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Logout
const styles = StyleSheet.create({

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",

    },
});