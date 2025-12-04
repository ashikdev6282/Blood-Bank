// src/firebase_services/authService.js
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/* ============================================
   ADMIN AUTH (same as before, kept intact)
   ============================================ */

// Login admin (used in AdminLoginPage)
export const LoginAdmin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout admin (also works for normal users)
export const LogoutAdmin = () => {
  return signOut(auth);
};

// Listen to auth changes (generic)
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ============================================
   NORMAL USER AUTH
   ============================================ */

/**
 * Register a normal user
 * form object can include:
 *  - name
 *  - email
 *  - password
 *  - bloodGroup
 *  - phone
 *  - location
 *  - isDonor (from "Register as donor" checkbox)
 */
export const registerUser = async ({
  name,
  email,
  password,
  bloodGroup,
  phone,
  location,
  isDonor,
}) => {
  // 1) Create Firebase Auth account
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // 2) Set displayName for convenience
  await updateProfile(cred.user, {
    displayName: name,
  });

  // 3) Create / update user profile document in Firestore
  const userRef = doc(db, "users", cred.user.uid);
  await setDoc(
    userRef,
    {
      name,
      email,
      bloodGroup: bloodGroup || "",
      phone: phone || "",
      location: location || "",
      isDonor: !!isDonor, // true if checkbox checked
      photoURL: cred.user.photoURL || "",
      createdAt: new Date().toISOString(),
    },
    { merge: true }
  );

  return cred.user;
};

// Normal user login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Generic logout (use this for user logout in navbar/profile)
export const logoutUser = () => {
  return signOut(auth);
};

// Get user profile document from Firestore (one-time fetch)
export const getUserProfile = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};
