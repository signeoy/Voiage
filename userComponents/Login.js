import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TextInput, Image, Pressable} from 'react-native';
import globalStyles from '../style';
//Firebase
import {auth} from "../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";

const Login = ({navigation, setUser}) => {
    const [email, setEmail] = useState("test@uia.no");
    const [password, setPassword] = useState("qwerty");

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid; // Retrieve the user ID
                const userEmail = user.email
                console.log(`User has been signed in: ${user.email}`);

                // Call the setter passed to us as a prop
                setUser(user);
                navigation.navigate('Home', { userId: userId, userEmail });
            })
            .catch((error) => {
                console.log(`Error: ${error.code} ${error.message}`);
            });
    }



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Image
                    style={globalStyles.logo}
                    source={require('../assets/Headerlogo_text.png')} />
                <TextInput
                    style={{...styles.input, marginTop: 80}}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="example@email.com"
                    //value="test@uia.no"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="password"
                    //value="Password1."
                />

            </View>

            <Pressable
                onPress={loginUser}>
                <View style={{...styles.login_button, backgroundColor: "#69B9AA"}}>
                    <Text style={styles.login_button_text}>Log in!</Text>
                </View>
            </Pressable>

            <Pressable style={{marginTop: 40}}
                onPress={() => navigation.navigate('Register')}>
                <View>
                    <Text style={styles.text}>Dont have an account?</Text>
                    <Text style={{...styles.text, ...styles.linkText, marginTop:10}}>Sign up here!</Text>
                </View>
            </Pressable>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    input: {
        color: "#030303",
        fontSize: 25,
        backgroundColor: "#FFFFFF",
        padding: 7,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        //automatically sticks to the bottom
        flexDirection: "row",
        borderStyle: "solid",
        margin: 1,
        borderWidth: 2,
        borderColor: "#9DBBB5",
        marginTop:20
    },
    login_button: {
        flexDirection: "row",
        //backgroundColor: "lightblue",
        justifyContent: "space-between",
        padding: 7,
        //alignItems: "center",
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 25,
        marginBottom: 0,
        //elevation: 30,
        //boarder
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    login_button_text:{
        fontSize: 30,
        marginLeft: 20,
        color: "#304D47",
    },
    linkText: {
        color: 'blue',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    text:{
        fontSize: 16,
        alignItems: "center",
        alignSelf: "center"
    },
});

export default Login;
