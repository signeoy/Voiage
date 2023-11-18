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
        width: 108.182,
        height: 18.806,
        color: '#858585',
        fontFamily: 'Imprima',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16, // Adjust line height as per requirements
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.16)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    logo: {
        marginTop: 74,
        alignItems: "center",
        alignSelf: "center",
        width: 241.588,
        height: 81,
    },
    // Add more global styles as needed
});

export default globalStyles;
