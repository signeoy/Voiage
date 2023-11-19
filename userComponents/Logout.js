import {signOut, deleteUser} from "firebase/auth";
import {auth} from "../firebaseConfig";

import React, { useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import globalStyles from "../style";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

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
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[globalStyles.settingButton]} onPress={deleteAccount}>
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
        width: "100%",

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