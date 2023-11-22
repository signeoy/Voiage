// style.js

import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    screen: {
        backgroundColor: '#CBE6E0',
        flex: 1,
        paddingBottom: 70
    },
    container: {
        width: 238,
        height: 43.88,
        flexShrink: 0,
        borderRadius: 8, // border-radius in React Native
        borderWidth: 1, // border-width in React Native
        borderColor: 'rgba(0, 0, 0, 0.16)', // border-color in React Native
        backgroundColor: '#F1F1F1', // background color in React Native
    },
    input: {
        width: 238,
        height: 43.88,
        flexShrink: 0,
        fontSize: 18,
        borderRadius: 8,
        flexDirection: "row",
        margin: 1,
        borderStyle: "solid",
        alignSelf: "center",
        borderColor: "#00000029",
        borderWidth: 1,
        backgroundColor: "#F1F1F1",
        fontFamily: "Roboto",
        paddingHorizontal: 10,
        marginTop: 11,
    },
    logo: {
        marginTop: 74,
        alignItems: "center",
        alignSelf: "center",
        width: 241.588,
        height: 87,

    },
    gradient: {
        flex: 0,
        height: '100%',
        width: '100%'
    },
    settingButton: {
        borderWidth: 1, // Border width
        borderColor: '#DBDBDB', // Border color
        backgroundColor: '#FFF', // Background color
        width: '100%', // Width (100%)
        height: 50, // Height
        flexShrink: 0, // Flex
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:10,
    },
    settingButton_text: {
        color: '#000', // Text color
        fontFamily: 'Roboto', // Font family
        fontSize: 20, // Font size
        fontStyle: 'normal', // Font style
        lineHeight: 16 * 1.5,
        alignItems: 'center',
        marginLeft: 10
    },
    linkText: {
        color: '#21AC8B',
        borderBottomWidth: 1,
        borderBottomColor: '#21AC8B',
    },
    text:{
        fontSize: 20,
        alignItems: "center",
        alignSelf: "center",
    },
    profilebox:{
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        borderColor: "#9D9D9D",
        borderStyle: "solid",
        borderWidth: 1,
    },
    profilebox_text:{
        flexShrink: 0,
        color: "#4D4D4D",
        fontFamily: 'Imprima-Regular',
        fontSize: 16,
        fontStyle: 'normal',
    }

    // Add more global styles as needed
});

export default globalStyles;
