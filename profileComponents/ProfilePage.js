import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList, ActivityIndicator
} from "react-native";

import React, { useState, useEffect} from "react";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection, addDoc, getDoc, where} from "firebase/firestore"

import {useRoute} from "@react-navigation/native";

// scripts
import ProfileComp from "./ProfileComp";
import Journal_print from "../journalComponents/Journal_print";

const ProfilePage = ({navigation}) => {
    const route = useRoute();
    const { id } = route.params;
    const { username } = route.params;

    return (

        <View>
            <View style = {{flexDirection : "row", padding: 15}}>
                <View style = {{flex:2, }}>
                    <Text style={styles.profile_name}>{username}</Text>
                </View>
             {/*   <View style={{flex: 1,}}>
                    <Text>Star here, {username}</Text>
                </View>*/}
                <View style = {styles.profile_photo}>
                    <Text style={{fontFamily: "Imprima-Regular"}}>
                        Profile{'\n'}photo here
                    </Text>
                </View>
            </View>

            <View>
                <Journal_print navigation={navigation} profileId={id}/>
            </View>
        </View>
    );

}

export default ProfilePage


const styles = StyleSheet.create({
    profile_name:{
        fontSize: 30,
        marginVertical: '30%',
        marginLeft:'15%',
        flex: 3,
        color: '#000000B2',
        //fontWeight: 400,
        fontStyle: 'normal',
        fontFamily: "Imprima-Regular",
    },
    profile_photo: {
        margin: 30,
        padding: 10,
        width: 100,
        height: 100,
        borderWidth: 10,
        borderColor: '#54BDA5',
        borderRadius: 20,
        backgroundColor: '#f3f3f3',

    },
});