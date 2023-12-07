import React, { useState } from 'react';
import {View, ScrollView, Text, StyleSheet, TextInput, Image, Pressable, Alert} from 'react-native';
import globalStyles from '../style';
//Firebase
import {auth} from "../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import {LinearGradient} from "expo-linear-gradient";

const Login = ({navigation, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                Alert.alert(`Incorrect email or password`);
                console.log(`Error: ${error.code} ${error.message}`);
            });
    }



    return (
        <LinearGradient
            colors={['#AAE8DB', '#F5F5F5']}
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
                    <View style={globalStyles.button}>
                        <Text style={globalStyles.button_text}>Log in!</Text>
                    </View>
                </Pressable>

                <Pressable style={{marginTop: 80}}
                    onPress={() => navigation.navigate('Register')}>
                    <View>
                        <Text style={globalStyles.text}>Dont have an account?</Text>
                        <Text style={[globalStyles.text, globalStyles.linkText, {marginTop:10}]}>Sign up here!</Text>
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
});

export default Login;
