// style.js

import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
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
    // Add more global styles as needed
});

export default globalStyles;
