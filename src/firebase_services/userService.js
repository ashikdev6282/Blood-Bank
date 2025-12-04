// src/firebase_services/userService.js
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// 🔄 Live listener for a user's profile document
export const listenToUserProfile = (uid, callback) => {
  const ref = doc(db, "users", uid);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  });
};

// ✏️ Update profile fields
export const updateUserProfile = (uid, data) => {
  const ref = doc(db, "users", uid);
  return setDoc(ref, data, { merge: true });
};
