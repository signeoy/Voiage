import {collection, deleteDoc, doc, getDocs, query} from "firebase/firestore";
import {db} from "../firebaseConfig";

export async function deleteCollection(path) {
    console.log("Deleting documents at path:", path);

    try {
        const q = query(collection(db, ...path.split(',')));
        const querySnapshot = await getDocs(q);

        const deleteOps = [];

        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref));
        });

        Promise.all(deleteOps).then(() => console.log('documents deleted'))
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
};

const deleteDocument = async (path) => {
    try {
        console.log("Delete triggered", props.id);

        // Use deleteDoc directly to delete the specified document
        await deleteDoc(doc(db,  ...path.split(',')));
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};
