import {Button, Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";

import deleteJournal from "../journalComponents/Journal_delete";

const Journal_comp = (props) => {
    const [title, setTitle] = useState(props.title);
    const [date, setDate] = useState(props.date);
    const [desc, setDesc] = useState(props.desc);

    const route = useRoute();
    const { userId } = route.params;



    return (
        <View style={styles.container}>

            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.title}>{props.date}</Text>
            <Text style={styles.title}>{props.desc}</Text>

        </View>
    );

}

export default Journal_comp

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
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
    journal_btn: {
        width: "30%",

    },
});