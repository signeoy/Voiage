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
        fontFamily: "Imprima-Regular",
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
        fontSize: 20, // Font size
        fontStyle: 'normal', // Font style
        lineHeight: 16 * 1.5,
        alignItems: 'center',
        marginLeft: 10,
        fontFamily: "Imprima-Regular",
    },
    linkText: {
        color: '#21AC8B',
        borderBottomWidth: 1,
        borderBottomColor: '#21AC8B',
        fontFamily: "Imprima-Regular",
    },
    text:{
        fontSize: 20,
        alignItems: "center",
        alignSelf: "center",
        fontFamily: "Imprima-Regular",
    },
    profilebox:{
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        paddingLeft: 30,
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        borderColor: "#9D9D9D",
        borderStyle: "solid",
        borderWidth: 1,
        height: 70
    },
    profilebox_text:{
        flexShrink: 0,
        color: "#4D4D4D",
        fontFamily: 'Imprima-Regular',
        fontSize: 19,
        fontStyle: 'normal',
    },
    topnavlogo:{
        marginTop: 10,
        alignItems: "center",
        alignSelf: "center",
        width: 198,
        height: 61.878,
    },
    container_topnav:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    journal_title:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    },
    journal_date:{
        color: '#00000080',
        fontFamily: "Imprima-Regular",
        flex: 1,
        fontSize: 12,
        fontWeight: "400",
        marginLeft:10,
    },
    journal_desc:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        margin: 10,
        fontSize: 14,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    },
    line:{
        width:'80%',
        height:2,
        backgroundColor: '#21AC8B',
        marginLeft: 10,
        marginVertical:5,
    },
    thumbnail:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        alignItems: "center"
    },
    entryTitleBox:{
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        width: '80%',
        height: 60,
        backgroundColor: '#FBCCB3',
        position: 'absolute',
        top: 170,
        left: '10%',
        zIndex: 3,
        marginBottom:20,

    },
    thumbnailContainer:{
        height:200,
        alignItems:'center',
    },
    button: {
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
    button_text:{
        color: '#FFF', // Text color
        textAlign: 'center', // Text alignment
        fontFamily: "Imprima-Regular", // Font family
        fontSize: 24, // Font size
        fontStyle: 'normal', // Font style
        fontWeight: "400", // Font weight
        lineHeight: 24 * 1.5, // Line height based on font size (adjust as needed)
        display: 'flex', // Not required in React Native, as it's the default behavior
        flexDirection: 'column', // Flex direction: column
        justifyContent: 'center', // Align items vertically in the center
        width: 238, // Width
        height: 43.88, // Height
        flexShrink: 0, // Flex shrink: 0 (prevents shrinking)
        // Other styles
    },
    info:{
        width:238,
        alignSelf: "center",
        paddingVertical:'10%'
    },
    entryTitle:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    },
    entryDesc:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        margin: 10,
        fontSize: 14,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    },
    journalEditorTitle:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    },
    journalEditorDate:{
        color: '#00000080',
        fontFamily: "Imprima-Regular",
        flex: 1,
        fontSize: 12,
        fontWeight: "400",
        marginLeft:10,
    },
    journalEditorDesc:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        marginTop: 300,
        marginBottom: 10,
        fontSize: 14,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
        marginHorizontal:10,
    }
    // Add more global styles as needed
});

export default globalStyles;
