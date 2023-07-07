import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';

import {NavigationContainer, navigationRef, onReady, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


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
                onPress={() => navigation.navigate('Privacy Policy',{userId})}>
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


function FavouriteScreen({ navigation }) {

  return (
      <View>

      </View>
  );
}
function HomeScreen({ navigation }) {

    return (
        <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>

        </View>
    );
}
function SettingsScreen({ navigation }) {

  return (
      <View>

      </View>
  );
}
function MyProfileScreen({ navigation }) {

  return (
      <View>

      </View>
  );
}
function LoginScreen({ navigation }) {

  return (
      <View>

      </View>
  );
}
function RegisterScreen({ navigation }) {

  return (
      <View>

      </View>
  );
}
function PrivacyScreen({ navigation }) {

  return (
      <View style={{...styles.container, backgroundColor: "#CAFFCC"}}>

      </View>
  );
}

function MyStack() {
  return (
      <Stack.Navigator /*screenOptions={{headerShown: false}}*/>
        <Stack.Screen name="TempMenu" component={TempMenu} options={{ headerLeft: null, headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null, headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="My Favourites" component={FavouriteScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="My Profile" component={MyProfileScreen} />
        <Stack.Screen name="Privacy Policy" component={PrivacyScreen} />
      </Stack.Navigator>
  );
}

export default function App() {

  return (

      <NavigationContainer  ref={navigationRef} onReady={onReady}>
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
