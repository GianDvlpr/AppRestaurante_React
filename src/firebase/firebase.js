import app from "firebase/app";
import firebaseConfig from './config'

import 'firebase/firestore'


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.db = app.firestore()
        
    }
}


const firebase = new Firebase();
export default firebase;