import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import Journal_print from "../journalComponents/Journal_print";

const db = getFirestore();

const deleteJournal = async (journalId, profileId) => {
    try {
        const journalRef = doc(db, "users", profileId, "Journal", journalId);

        // Delete the entire journal (document)
        await deleteDoc(journalRef);
        console.log(`Journal ${journalId} deleted successfully.`);
        Journal_print();
        // After deletion, you might want to update your journal list or perform any other necessary actions.
    } catch (error) {
        console.error('Error deleting journal:', error);
    }
};

export default deleteJournal