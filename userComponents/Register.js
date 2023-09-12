import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Pressable} from 'react-native';

//Firebase
import {auth, db} from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

const Register = ({navigation, setUser}) => {
    const [email, setEmail] = useState("test@uia.no");
    const [username, setUsername] = useState("testuser");
    const [password, setPassword] = useState("qwerty");

    const [agree, setAgree] = useState(false);
    //for the checkbox
    const toggleAgree = () => {
        setAgree(!agree);
    };
    const handleRegister = () => {
        if (agree) {
            registerUser()

        } else {
            // Show an error message if the checkbox is not checked
            Alert.alert('Error', 'Please agree to the Privacy Policy');
        }
    };
    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const userId = user.uid; // Retrieve the user ID
                Alert.alert('Registration successful');
                console.log(`User has been registered: ${user.email}`);
                loginUser()



                addUser(userId, username)
            })
            .catch((error) => {
                console.log(`registration error: ${error.code} ${error.message}`);
            });

    }

    const addUser = async (userId, username) => {
        try {
            const userRef = doc(db, 'users', userId); // Reference to the document with the userId
            await setDoc(userRef, { username }); // Set the 'username' field under the user document

            console.log('Document added successfully.');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };
    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid; // Retrieve the user ID
                const userEmail = user.email
                console.log(`User has been signed in: ${user.email}`);

                // Call the setter passed to us as a prop
                setUser(user);
                navigation.navigate('Home', { userId, userEmail });
            })
            .catch((error) => {
                console.log(`login error: ${error.code} ${error.message}`);
            });
    }



    return(
        <ScrollView>
            <View style={{marginTop:50}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="Password"
                />
                {/*<Privacy/>*/}
                <View style={{marginTop: 40}}>
                    <Pressable onPress={() => navigation.navigate('Privacy')}>
                        <Text style={styles.text}>Please read and accept our</Text>
                        <Text style={{...styles.linkText, ...styles.text}}>Privacy Policy</Text>
                    </Pressable>
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity style={styles.checkbox} onPress={toggleAgree}>
                            {agree ? <Text style={styles.checkmark}>✓</Text> : null}
                        </TouchableOpacity>
                        <Text style={styles.text}>I accept the Privacy Policy</Text>
                    </View>
                </View>
                {!agree ? (
                    <Pressable
                        onPress={handleRegister} disabled={!agree}>
                        <View style={{...styles.reg_button, backgroundColor: "#9fd2c5",}}>
                            <Text style={{...styles.reg_button_text, color: "#487968"}}>Register!</Text>
                        </View>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={handleRegister} disabled={!agree}>
                        <View style={{...styles.reg_button, backgroundColor: "#69B9AA",}}>
                            <Text style={styles.reg_button_text}>Register</Text>
                        </View>
                    </Pressable>
                )}
                <Pressable style={{marginTop: 40}}
                           onPress={() => navigation.navigate('Login')}>
                    <View>
                        <Text style={styles.text}>Already have an account?</Text>
                        <Text style={{...styles.text, ...styles.linkText, marginTop:10}}>Log in here!</Text>
                    </View>
                </Pressable>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 60
    },
    checkmark: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    agreeText: {
        fontSize: 16,
        alignItems: "center"
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 1,
        alignItems: 'center',
    },
    inputs: {
        //flexDirection: "row",
        marginTop: "auto",
    },
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    underlineTextStyle: {
        textDecorationLine: 'underline',
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
    reg_button: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 7,
        width: "70%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 25,
        marginBottom: 0,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
    reg_button_text:{
        fontSize: 30,
        marginLeft: 20,
        color: "#304D47",
    },
});

export default Register;