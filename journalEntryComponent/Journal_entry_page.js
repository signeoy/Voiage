import {
    Text,
    View,
    ScrollView,
    Image
} from "react-native";

import Journal_entry_print from "./Journal_entry_print";
import {useRoute} from "@react-navigation/native";
import globalStyles from "../style";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

// scripts
//andre personers profiler journal entry page. uten redigering og sånt.
const Journal_entry_page = ({navigation, profileId}) => {

    const route = useRoute();
    const { journal } = route.params;

    return (
        <ScrollView style={{flex:1, height:'100%'}}>
            <View style={globalStyles.thumbnailContainer}>
                {journal.img !== "" ? (
                    <View style={globalStyles.thumbnail}>
                        <Image
                            source={{uri: journal.img}}
                            style={{width: windowWidth*1, height: 200}}
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
            <View>
                <Text style={globalStyles.journalEditorDesc}>{journal.desc}</Text>
            </View>
            <View style={{marginTop:10}}>
                <View style={globalStyles.entry_top}>
                    <Journal_entry_print
                        navigation={navigation}
                        profileId={profileId}
                        journal={journal}
                    />
                </View>
            </View>
        </ScrollView>

    );
}


export default Journal_entry_page
