import FirebaseKeys from "./config";
import firebase from "firebase";
require('firebase/firestore')

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp({ FirebaseKeys });
        }
    }

    addProduct = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("products")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    photo: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    createProduct = async product => {
        return new Promise((res, rej) => {
            this.firestore
                .collection("products")
                .add({
                    nama: product.nama,
                    harga: product.harga,
                    category: product.category,
                    photo: product.photo,
                    photoUrl: product.photoUrl,
                    createdAt: this.timestamp
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    signOut = () => {
        firebase.auth().signOut();
    };

    get storage() {
        return firebase.storage();
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;