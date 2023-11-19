import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TextInput, Image, Pressable} from 'react-native';
import globalStyles from '../style';
//Firebase
import {auth} from "../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {LinearGradient} from "expo-linear-gradient";

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
        <LinearGradient
            colors={['#CAE6E0', '#F5F5F5']}
            style={globalStyles.gradient}>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <Image
                        style={globalStyles.logo}
                        source={require('../assets/Headerlogo_text.png')} />
                    <TextInput
                        style={[globalStyles.input, { marginTop: 80 }]}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Email"
                        //value="test@uia.no"
                    />
                    <TextInput
                        style={globalStyles.input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholder="Password"
                        //value="Password1."
                    />

                </View>

                <Pressable
                    onPress={loginUser}>
                    <View style={styles.login_button}>
                        <Text style={styles.login_button_text}>Log in!</Text>
                    </View>
                </Pressable>

                <Pressable style={{marginTop: 80}}
                    onPress={() => navigation.navigate('Register')}>
                    <View>
                        <Text style={styles.text}>Dont have an account?</Text>
                        <Text style={{...styles.text, ...styles.linkText, marginTop:10}}>Sign up here!</Text>
                    </View>
                </Pressable>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    login_button: {
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
        marginTop: 12,
    },
    login_button_text:{
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
    linkText: {
        color: '#21AC8B',
        borderBottomWidth: 1,
        borderBottomColor: '#21AC8B',
    },
    text:{
        fontSize: 16,
        alignItems: "center",
        alignSelf: "center"
    },
});

export default Login;
