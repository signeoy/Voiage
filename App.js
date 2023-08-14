import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import React, {useState} from 'react';

// navigation
import {NavigationContainer, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import {AntDesign, MaterialIcons, Entypo} from "@expo/vector-icons";

// Import our userComponents. See the userComponents directory
import Login from "./userComponents/Login";
import Logout from "./userComponents/Logout";
import Register from "./userComponents/Register";
import Profile from "./profileComponents/Profiles";
import BottomTab from "./tabComponents/BottomTab";

const Stack = createStackNavigator();

function TempMenu({ navigation }) {

  return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={{...styles.scroll_container} }>
          <View style = {styles.header}>
            <Text style = {{...styles.heading, textAlign:"center"}}>This is a temparary menu</Text>
          </View>
          <View style={{...styles.container}}>

            <Pressable onPress={() => navigation.navigate('My Favourites')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                <Text style={styles.nav_button_text}>My Favourites</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Home')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCBEBE" }}>
                <Text style={styles.nav_button_text}>Home</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('My Profile')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCBEBE" }}>
                <Text style={styles.nav_button_text}>My Profile</Text>
              </View>
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('Privacy Policy',)}>
              <View style={{...styles.nav_button, backgroundColor: "#F8DAC4",}}>
                <Text style={styles.nav_button_text}>Privacy Policy</Text>
              </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Settings')}>
              <View style={{...styles.nav_button, backgroundColor: "#CAFFCC",}}>
                <Text style={styles.nav_button_text}>Settings</Text>
              </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Register')}>
              <View style={{...styles.nav_button, backgroundColor: "#CAFFCC",}}>
                <Text style={styles.nav_button_text}>Register</Text>
              </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('Login')}>
              <View style={{...styles.nav_button, backgroundColor: "#CAFFCC",}}>
                <Text style={styles.nav_button_text}>Login</Text>
              </View>
            </Pressable>

          </View>
        </ScrollView>
      </SafeAreaView>
  );
}
function HomeScreen({ navigation }) {

    const [user, setUser] = useState(null);
    const route = useRoute();
    const { userId, userEmail } = route.params;


    return (
        <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
            <Pressable onPress={() => navigation.navigate('My Favourites')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>Favourites</Text>
                </View>
            </Pressable>

            <Profile navigation={navigation} userId={userId}/>

            <BottomTab navigation={navigation} userId={userId}/>

        </View>

    );
}

function FavouriteScreen({ navigation }) {

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
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

    const route = useRoute();
    const { userId, userEmail } = route.params;
    return (
        <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
            <Pressable onPress={() => navigation.navigate('Journal')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>a journal</Text>
                </View>
            </Pressable>
            <BottomTab navigation={navigation} userId={userId}/>

        </View>
    );
}

function MyProfileScreen({ navigation }) {

    const route = useRoute();
    const { userId, userEmail } = route.params;

    return (
        <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
            <Pressable onPress={() => navigation.navigate('Add Journal')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>add journal</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Journal Editor')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>edit journal</Text>
                </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Journal')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>a journal</Text>
                </View>
            </Pressable>

            <BottomTab navigation={navigation} userId={userId}/>
        </View>
    );
}
function JournalScreen({ navigation }) {
    const route = useRoute();
    const { userId, userEmail } = route.params;

  return (
      <View>
        <Text>Journal</Text>

        <BottomTab navigation={navigation} userId={userId}/>


      </View>
  );
}

function SettingsScreen({ navigation }) {
    const route = useRoute();
    const { userId, userEmail } = route.params;

    return (
        <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
            <Pressable onPress={() => navigation.navigate('Privacy')}>
                <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                    <Text style={styles.nav_button_text}>Privacy policy</Text>
                </View>
            </Pressable>
            <Logout navigation={navigation}/>

            <BottomTab navigation={navigation} userId={userId}/>
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
function PrivacyScreen({ navigation }) {

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>

      </View>
  );
}
function AddJournalScreen({ navigation }) {
    const route = useRoute();
    const { userId, userEmail } = route.params;

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
          <BottomTab navigation={navigation} userId={userId}/>

      </View>
  );
}
function AddEntryScreen({ navigation }) {
    const route = useRoute();
    const { userId, userEmail } = route.params;

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
          <BottomTab navigation={navigation} userId={userId}/>

      </View>
  );
}
function JournalEditorScreen({ navigation }) {
    const route = useRoute();
    const { userId, userEmail } = route.params;

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>
          <Pressable onPress={() => navigation.navigate('Add Entry')}>
              <View style={{ ...styles.nav_button, backgroundColor: "#FCF6BE" }}>
                  <Text style={styles.nav_button_text}>add entry</Text>
              </View>
          </Pressable>
          <BottomTab navigation={navigation} userId={userId}/>

      </View>
  );
}

function MyStack() {
  return (
      <Stack.Navigator /*screenOptions={{headerShown: false}}*/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null, headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerLeft: null, headerShown: false }}/>
        <Stack.Screen name="Privacy Policy" component={PrivacyScreen} />

        <Stack.Screen name="TempMenu" component={TempMenu} options={{ headerLeft: null, headerShown: false }} />

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="My Favourites" component={FavouriteScreen} options={{ headerLeft: null, headerShown: false }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="My Profile" component={MyProfileScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} />


        <Stack.Screen name="Add Journal" component={AddJournalScreen} />
        <Stack.Screen name="Add Entry" component={AddEntryScreen} />

        <Stack.Screen name="Journal Editor" component={JournalEditorScreen} />
      </Stack.Navigator>
  );
}


export default function App() {

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav_button: {
    flexDirection: "row",
    //backgroundColor: "lightblue",
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
    color: 'rgba(0, 0, 0, 0.7)'
  },
  scroll_container: {
    // backgroundColor: "#BEFCE0",
    paddingTop: 60,
    justifyContent: 'space-between',
    minHeight: '100%',
    paddingBottom: 40,
  },
});
