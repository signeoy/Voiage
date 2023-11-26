import {StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

// navigation
import {NavigationContainer, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {doc, getDoc} from "firebase/firestore";
import {auth} from "./firebaseConfig";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons";

// Import our userComponents. See the userComponents directory
import Login from "./userComponents/Login";
import Logout from "./userComponents/Logout";
import Register from "./userComponents/Register";

import Profile from "./profileComponents/Profiles";
import MyProfilePage from "./profileComponents/MyProfilePage";
import ProfilePage from "./profileComponents/ProfilePage";

import Journal_create from "./journalComponents/Journal_create";
import Journal_editor from "./journalComponents/Journal_editor";
import Journal_entry_create from "./journalEntryComponent/Journal_entry_create";
import Journal_entry_page from "./journalEntryComponent/Journal_entry_page";


import BottomTab from "./tabComponents/BottomTab";

import globalStyles from "./style";
import ExternalLink from "./userComponents/PrivacyPolicy";


import { useFonts } from 'expo-font';


const Stack = createStackNavigator();


const privacy = 'https://voiage-oso-soy.blogspot.com/2023/11/privacy-policy.html';


function HomeScreen({ navigation }) {


    return (
        <View style={globalStyles.screen}>

           {/* <Pressable onPress={() => navigation.navigate('My Favourites')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>Favourites</Text>
                </View>
            </Pressable>*/}
            <ScrollView >
                <Profile navigation={navigation}/>
            </ScrollView>
            <BottomTab navigation={navigation}/>

        </View>

    );
}

function FavouriteScreen({ navigation }) {

  return (
      <View style={globalStyles.screen}>
          <Pressable onPress={() => navigation.navigate('Home')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                  <Text style={styles.nav_button_text}>All profiles</Text>
              </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profile')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                  <Text style={styles.nav_button_text}>a profile</Text>
              </View>
          </Pressable>
      </View>
  );
}
function ProfileScreen({ navigation }) {

    return (
        <View style={globalStyles.screen}>
            <ScrollView style={{ marginVertical: 10, flexDirection: "column"}}>
            <ProfilePage
                navigation={navigation}
            />
            </ScrollView>
            <BottomTab navigation={navigation}/>
        </View>
    );
}

function MyProfileScreen({ navigation }) {

    return (
        <View style={globalStyles.screen}>
            <ScrollView style={{ marginVertical: 10, flexDirection: "column"}}>
                <MyProfilePage navigation={navigation}/>
            </ScrollView>

            <BottomTab navigation={navigation}/>
        </View>
    );
}
function JournalScreen({ navigation }) {
    const route = useRoute();
    const { profileId } = route.params;

  return (
      <View style={globalStyles.screen}>
        <Journal_entry_page navigation={navigation} profileId={profileId}/>
        <BottomTab navigation={navigation}/>

      </View>
  );
}

function SettingsScreen({ navigation }) {

    return (
        <View style={globalStyles.screen}>
            <Image
                style={globalStyles.logo}
                source={require('./assets/Headerlogo_text.png')} />
                <View style={[globalStyles.settingButton, {marginVertical:60}]}>
                    <AntDesign name="Safety" size={24} color="black" style={{marginRight:10}}/>
                    <ExternalLink url={privacy}/>

                </View>

            <Logout navigation={navigation}/>

            <BottomTab navigation={navigation} />
        </View>
    );
}
function LoginScreen({ navigation }) {
  const [user, setUser] = useState(null);
  return (
      <View>
          <Login navigation={navigation} setUser={setUser}/>
      </View>
  );
}
function RegisterScreen({ navigation }) {
  const [user, setUser] = useState(null);
  return (
      <View>
          <Register navigation={navigation} setUser={setUser}/>
      </View>
  );
}

function AddJournalScreen({ navigation }) {

  return (
      <View style={[globalStyles.screen, {flex: 1}]}>
          <Journal_create navigation={navigation}/>
          <BottomTab navigation={navigation}/>

      </View>
  );
}
function AddEntryScreen({ navigation }) {

  return (
      <View style={globalStyles.screen}>

          <Journal_entry_create navigation={navigation}/>
          <BottomTab navigation={navigation}/>

      </View>
  );
}
function JournalEditorScreen({ navigation }) {

  return (
      <View style={globalStyles.screen}>

          <Journal_editor navigation={navigation}/>

          <BottomTab navigation={navigation}/>

      </View>
  );
}

function MyStack() {
  return (
      <Stack.Navigator /*screenOptions={{headerShown: false}}*/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null, headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: null, headerShown: false }}/>

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null}} />

        <Stack.Screen name="My Favourites" component={FavouriteScreen} options={{ headerLeft: null, headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="My Profile" component={MyProfileScreen} options={{ headerLeft: null}}/>
        <Stack.Screen name="Journal" component={JournalScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerLeft: null, headerShown: false }} />


        <Stack.Screen name="Add Journal" component={AddJournalScreen} />
        <Stack.Screen name="Add Entry" component={AddEntryScreen} />

        <Stack.Screen name="Journal Editor" component={JournalEditorScreen} />
      </Stack.Navigator>
  );
}


export default function App() {
    const [fontsLoaded] = useFonts({
        'Imprima-Regular': require('./assets/fonts/Imprima-Regular.ttf'),
    });

  return (

      <NavigationContainer>
          <MyStack />

      </NavigationContainer>

  );
}
// installs:
//https://reactnavigation.org/docs/stack-navigator/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70
  },
  nav_button: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    //alignItems: "center",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 25,
    marginBottom: 0,
    elevation: 30,
    //boarder
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  nav_button_text:{
    fontSize: 30,
    marginLeft: 20,
    color: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Imprima-Regular'
  },

  scroll_container: {
    paddingTop: 60,
    justifyContent: 'space-between',
    minHeight: '100%',
    paddingBottom: 40,
  },
});
