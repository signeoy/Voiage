import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../firebaseConfig";

export function getJournalList(profileId) {
    console.log("Getting list of journals")
    try {
        const querySnapshot = getDocs(query(collection(db,"users",profileId, "Journal")));
        const journals = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        //console.log("journal:", journals);
        return(journals);
    } catch (error) {
        console.error("Error getting journal list: ", error);
    }

};