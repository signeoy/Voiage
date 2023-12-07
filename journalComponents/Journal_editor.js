import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from "react-native";

import {  MaterialIcons } from '@expo/vector-icons';
import {auth, db} from "../firebaseConfig"
import {doc, updateDoc, deleteDoc, getDocs, query, collection} from "firebase/firestore"

import Journal_entry_print from "../journalEntryComponent/Journal_entry_print";
import {useRoute} from "@react-navigation/native";
import globalStyles from "../style";
import { Dimensions } from "react-native";

// entry page for current user
const windowWidth = Dimensions.get("window").width;

const Journal_editor = ({navigation}) => {

    const route = useRoute();
    const { journal } = route.params;

    const user = auth.currentUser;
    const userId = user.uid; // Retrieve the user ID


    const deleteFunction = async () => {
        try{
            console.log("deletefunction running", journal.id)
            await deleteCollection();
            await deleteDoc(doc(db, "users", userId, "Journal", journal.id));

            //const journalList = getJournalList()
            navigation.navigate('My Profile',{ userId:userId})
        } catch (e) {
            console.log("error trying to delete: ", e)
        }
    }

    async function deleteCollection() {
        const q = query(collection(db, "users", userId, "Journal", journal.id, "entry"));
        const querySnapshot = await getDocs(q);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });

        Promise.all(deleteOps).then(() => console.log('documents deleted'))
    }



    return (
        <ScrollView style={{flex:1, height:'100%'}}>
            <View style={globalStyles.thumbnailContainer}>
                {journal.img !== "" ? (
                    <View style={globalStyles.thumbnail}>
                        <Image
                            source={{uri: journal.img}}
                            style={{
                                width: windowWidth * 1,
                                height: 200}}
                            resizeMode="cover"
                            onError={(error) => console.log("Error loading image")}
                        />
                    </View>
                ): null}
                <View style={globalStyles.entryTitleBox}>
                    <Text style={globalStyles.journalEditorTitle}>{journal.title}</Text>
                    <Text style={globalStyles.journalEditorDate}>{journal.date}</Text>
                </View>
            </View>
            <Text style={globalStyles.journalEditorDesc}>{journal.desc}</Text>

            <Pressable onPress={() => navigation.navigate('Add Entry', { userId: userId, journal: journal })}>
                <View style={{...styles.headerButton, marginTop:15}}>
                    <MaterialIcons name={"add"}size={40} color="black"/>
                    <Text style={styles.iconText}>Add Journal Entry</Text>
                </View>
            </Pressable>

            <Pressable onPress={deleteFunction}>
                <View style={styles.headerButton}>
                    <MaterialIcons name={"delete"}size={40} color="black"/>
                    <Text style={styles.iconText}>Delete Journal</Text>
                </View>
            </Pressable>

            <View>
                <View style={globalStyles.entry_top}>
                    <Journal_entry_print
                    navigation={navigation}
                    profileId={userId}
                    journal={journal}
                    />
                </View>
            </View>
        </ScrollView>

    );

}


export default Journal_editor


const styles = StyleSheet.create({
    headerButton:{
        flexDirection: "row",
        marginLeft:'5%',
        marginTop:5
    },
    iconText:{
        fontFamily: "Imprima-Regular",
        flex: 1,
        margin: 10,
        fontSize: 14,
        color: '#000',
        fontStyle: 'normal',
        fontWeight: "400",
    }
});