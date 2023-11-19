import {signOut, deleteUser} from "firebase/auth";
import {auth} from "../firebaseConfig";

import React, { useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';


const Logout = ({navigation, setUser}) => {
    const user = auth.currentUser;
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


    const deleteAccount = async () => {
        deleteUser(user).then(() => {
            // User deleted.
            navigation.navigate('Login')
        }).catch((error) => {
            // An error ocurred
            console.log(`Error: ${error.code} ${error.message}`);
        });
    };



    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={deleteAccount}>
                    <Text style={styles.buttonText}>Delete User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logoutUser}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Logout
const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },

    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "90%",

    },
    button: {
        paddingVertical: 12,
        //paddingHorizontal: 90,
        width: "70%",
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginVertical: 15,
        elevation: 10,
    },
    buttonText: {
        color: '#304D47',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});