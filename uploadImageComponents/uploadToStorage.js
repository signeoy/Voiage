import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from "../firebaseConfig"

export function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.onerror = function () {
            reject(new Error('uriToBlob failed'));
        };

        xhr.responseType = 'blob';

        xhr.open('GET', uri, true);

        xhr.send(null);
    });
}

export async function uploadImageToFirebase(imageUri) {
    try {
        const blob = await uriToBlob(imageUri);

        // Generate a unique filename using a timestamp and a random number
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000); // Adjust the range as needed
        const filename = `images/${timestamp}_${randomNumber}.jpg`;

        // Upload the blob to Firebase Storage with the new filename
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
    } catch (e) {
        console.log("error with uploadImageToFirebase function: ", e);
        throw e; // Rethrow the error to handle it in the calling code
    }
}
