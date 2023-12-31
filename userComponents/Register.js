import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Pressable,
    Image,
} from 'react-native';
import ExternalLink from './PrivacyPolicy';
import globalStyles from '../style';

//Firebase
import {auth, db} from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {LinearGradient} from "expo-linear-gradient";

const Register = ({navigation, setUser}) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        try {
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
                    Alert.alert(`registration error: ${error.message}`);
                    console.log(`registration error: ${error.code} ${error.message}`);
                });
        } catch (error) {
            Alert.alert(`Error creating user: ${error.message}`);
            console.log(`Error creating user: ${error.code} ${error.message}`);
        }

    }

    const addUser = async (userId, username) => {
        try {
            const userRef = doc(db, 'users', userId); // Reference to the document with the userId
            const usernameLowerCase = username.toLowerCase();
            await setDoc(userRef, { username: username, usernameLowerCase: usernameLowerCase }); // Set the 'username' field under the user document

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

    const privacy = 'https://voiage-oso-soy.blogspot.com/2023/11/privacy-policy.html';

    return(
        <LinearGradient
            colors={['#AAE8DB', '#F5F5F5']}
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
                    <View style={{marginVertical: 20}}>
                        <View style={{...styles.checkboxContainer, marginLeft: '3%', marginTop:10}}>
                            <TouchableOpacity style={styles.checkbox} onPress={toggleAgree}>
                                {agree ? <Text style={styles.checkmark}>✓</Text> : null}
                            </TouchableOpacity>
                            <Text style={[globalStyles.text, {fontSize:20}]}>I accept the </Text>
                            <ExternalLink style={[globalStyles.text, globalStyles.linkText]} url={privacy}/>
                        </View>
                    </View>
                    {!agree ? (
                        <Pressable
                            onPress={handleRegister} disabled={!agree}>
                            <View style={[globalStyles.button, {backgroundColor: "#fabe9d"}]}>
                                <Text style={globalStyles.button_text}>Register!</Text>
                            </View>
                        </Pressable>
                    ) : (
                        <Pressable
                            onPress={handleRegister} disabled={!agree}>
                            <View style={globalStyles.button}>
                                <Text style={globalStyles.button_text}>Register!</Text>
                            </View>
                        </Pressable>
                    )}
                    <Pressable style={{marginTop: 50}}
                               onPress={() => navigation.navigate('Login')}>
                        <View>
                            <Text style={globalStyles.text}>Already have an account?</Text>
                            <Text style={[globalStyles.text, globalStyles.linkText, {marginTop:10}]}>Log in here!</Text>
                        </View>
                    </Pressable>

                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
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
        //fontWeight: 'bold',
    },
});

export default Register;