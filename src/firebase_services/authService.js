import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//Login admin
export const LoginAdmin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

//Logout admin
export const LogoutAdmin = () => {
    return signOut(auth);
}

// Listen to auth changes (used in context)
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
}


export const listenToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
}