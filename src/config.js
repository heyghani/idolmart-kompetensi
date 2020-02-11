import * as firebase from 'firebase'
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBN8RGODew87QdNLERJk6o9WiQdJM8PxIQ",
    authDomain: "idolmart-265011.firebaseapp.com",
    databaseURL: "https://idolmart-265011.firebaseio.com",
    projectId: "idolmart-265011",
    storageBucket: "idolmart-265011.appspot.com",
    messagingSenderId: "618607700266",
    appId: "1:618607700266:web:b977c23bf46e50f9ecd653",
    measurementId: "G-FK0HDYFC41"
};

// export default !firebase.apps.length
//     ? firebase.initializeApp(firebaseConfig).firestore()
//     : firebase.app().firestore();
const fire = firebase.initializeApp(config);
export default fire;