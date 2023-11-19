import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Pressable, Image} from 'react-native';
import globalStyles from '../style';
//Firebase
import {auth, db} from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {LinearGradient} from "expo-linear-gradient";

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
        <LinearGradient
            colors={['#CAE6E0', '#F5F5F5']}
            style={globalStyles.gradient}>
            <ScrollView>
                <View>
                    <Image
                        style={globalStyles.logo}
                        source={require('../assets/Headerlogo_text.png')} />
                    <TextInput
                        style={[globalStyles.input, { marginTop: 80 }]}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Email"
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={setUsername}
                        placeholder="Username"
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                    {/*<Privacy/>*/}
                    <View style={{marginTop: 20}}>
                        <View style={{...styles.checkboxContainer, marginLeft: 35, marginTop:10}}>
                            <TouchableOpacity style={styles.checkbox} onPress={toggleAgree}>
                                {agree ? <Text style={styles.checkmark}>✓</Text> : null}
                            </TouchableOpacity>
                            <Text style={{...styles.text, fontSize:15}}>I accept the </Text>
                            <Pressable onPress={() => navigation.navigate('Privacy')}>
                                <Text style={{...styles.linkText, fontSize:15}}>Privacy Policy</Text>
                            </Pressable>
                        </View>
                    </View>
                    {!agree ? (
                        <Pressable
                            onPress={handleRegister} disabled={!agree}>
                            <View style={{...styles.reg_button, backgroundColor: "#fabe9d",}}>
                                <Text style={{...styles.reg_button_text}}>Register!</Text>
                            </View>
                        </Pressable>
                    ) : (
                        <Pressable
                            onPress={handleRegister} disabled={!agree}>
                            <View style={styles.reg_button}>
                                <Text style={styles.reg_button_text}>Register!</Text>
                            </View>
                        </Pressable>
                    )}
                    <Pressable style={{marginTop: 50}}
                               onPress={() => navigation.navigate('Login')}>
                        <View>
                            <Text style={styles.text}>Already have an account?</Text>
                            <Text style={{...styles.text, ...styles.linkText, marginTop:10}}>Log in here!</Text>
                        </View>
                    </Pressable>

                </View>
            </ScrollView>
        </LinearGradient>
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
        color: '#21AC8B',
        borderBottomWidth: 1,
        borderBottomColor: '#21AC8B',
    },
    text:{
        fontSize: 16,
        alignItems: "center",
        alignSelf: "center",

    },
    reg_button: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        width: 238, // Width
        height: 43.88, // Height
        flexShrink: 0, // Flex shrink: 0 (prevents shrinking)
        borderRadius: 13, // Border radius
        borderWidth: 1, // Border width
        borderColor: 'rgba(0, 0, 0, 0.30)', // Border color
        backgroundColor: '#F79967', // Background color
        marginTop: 30,
        },
    reg_button_text:{
        color: '#FFF', // Text color
        textAlign: 'center', // Text alignment
        fontFamily: 'Roboto', // Font family
        fontSize: 24, // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '400', // Font weight
        lineHeight: 24 * 1.5, // Line height based on font size (adjust as needed)
        display: 'flex', // Not required in React Native, as it's the default behavior
        flexDirection: 'column', // Flex direction: column
        justifyContent: 'center', // Align items vertically in the center
        width: 238, // Width
        height: 43.88, // Height
        flexShrink: 0, // Flex shrink: 0 (prevents shrinking)
        // Other styles
    },
});

export default Register;