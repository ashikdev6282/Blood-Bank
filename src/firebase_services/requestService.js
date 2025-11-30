import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, } from "firebase/firestore";
import { db } from "../firebase";

const requestsRef = collection(db, "requests");

// 🔴 Real-time listener (for admin dashboard)
export const listenToRequests = (callback) => {
  const q = query(requestsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

// ➕ Add a new request (used on user side)
export const addBloodRequest = (request) => {
  return addDoc(requestsRef, {
    ...request,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
};

// ✅ Update status (Approve / Reject)
export const updateRequestStatus = (id, status) => {
  const docRef = doc(db, "requests", id);
  return updateDoc(docRef, { status });
};

// 🗑 Optional – delete a request
export const deleteRequest = (id) => {
  const docRef = doc(db, "requests", id);
  return deleteDoc(docRef);
};
