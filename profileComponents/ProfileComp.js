import { Text, View,} from "react-native";

import globalStyles from "../style";


const ProfileComp = (props) => {


    return (
        <View style={globalStyles.profilebox}>

            <Text style={globalStyles.profilebox_text}>{props.username}</Text>
{/*
             checked icon
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? (
                        <AntDesign name="checkcircle" size={24} color="black" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    )
                }
            </Pressable>*/}


        </View>
    );

}

export default ProfileComp
