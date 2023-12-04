import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import {useRoute} from "@react-navigation/native";
import {auth} from "../firebaseConfig";

const BottomTab = ({navigation}) => {

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    return (
        <View style={styles.bottomTabContainer}>
            <Pressable onPress={() => navigation.navigate('Home', { userId })}>
                <View style={styles.tabButton}>
                    <Entypo name="home" size={24} color="black" />
                    <Text style={styles.tabButtonText}>Home</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('My Profile', {userId})}>
                <View style={styles.tabButton}>
                    <Entypo name="user" size={24} color="black" />
                    <Text style={styles.tabButtonText}>Profile</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Settings', {userId})}>
                <View style={styles.tabButton}>
                    <Entypo name="cog" size={24} color="black" />
                    <Text style={styles.tabButtonText}>Settings</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: '#e6f5f2',
        elevation: 8, // Adjust the elevation to change the shadow effect
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: -4 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 8, // Shadow blur radius
        position: 'absolute',
        bottom: 0,
    },
    tabButton: {
        alignItems: 'center',
    },
    tabButtonText: {
        fontSize: 12,
        marginTop: 5,
        fontFamily: "Imprima-Regular"
    },

});

export default BottomTab;
