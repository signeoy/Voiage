import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';

import {useRoute} from "@react-navigation/native";
import {auth} from "../firebaseConfig";

const BottomTab = ({navigation}) => {

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID

    return (
        <View style={styles.bottomTabContainer}>
            <Pressable onPress={() => navigation.navigate('Home', { userId })}>
                <View style={styles.tabButton}>
                    <Feather name="users" size={34} color="black" />
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('My Profile', {userId})}>
                <View style={styles.tabButton}>
                    <AntDesign name="home" size={34} color="black" />
                </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Settings', {userId})}>
                <View style={styles.tabButton}>
                    <Ionicons name="settings-outline" size={34} color="black" />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 20,
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
});

export default BottomTab;
