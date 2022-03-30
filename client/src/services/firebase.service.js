import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAixivdvd8ceS1aHK6MHdkaCNbczhLbRNI",
  authDomain: "shopping-cart-db-3c37c.firebaseapp.com",
  projectId: "shopping-cart-db-3c37c",
  storageBucket: "shopping-cart-db-3c37c.appspot.com",
  messagingSenderId: "854441485515",
  appId: "1:854441485515:web:534c0b13c7aea6de3c674e"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export default firebase;
