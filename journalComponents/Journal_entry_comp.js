import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";


const Journal_entry_comp = (props) => {
    const [title, setTitle] = useState(props.title);
    const [text, setText] = useState(props.text);

    const route = useRoute();
    const { userId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.title}>{props.text}</Text>

        </View>
    );
}

export default Journal_entry_comp

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        flex: 1,
        margin: 10,
        fontSize: 17,
        fontWeight: "500",
    },
});