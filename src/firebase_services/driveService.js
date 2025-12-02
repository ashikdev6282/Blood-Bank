import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, } from "firebase/firestore";
import { db } from "../firebase";
import { AlertHeading } from "react-bootstrap";

const drivesRef = collection(db, "drives");

// 🔴 Real-time listener for all drives (admin dashboard)
export const listenToDrives = (callback) => {
  const q = query(drivesRef, orderBy("createdAt", "desc")); 

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

// ➕ Add new drive (used by user host form or admin)
export const addDrive = (drive) => {
  return addDoc(drivesRef, {
    ...drive,
    status: drive.status || "Pending",
    createdAt: serverTimestamp(),
  });
};

// ✏️ Update drive (status / details)
export const updateDrive = (id, updates) => {
  const docRef = doc(db, "drives", id);
  return updateDoc(docRef, updates);
};

// 🗑 Delete drive
export const deleteDrive = (id) => {
  const docRef = doc(db, "drives", id);
  return deleteDoc(docRef);
}
