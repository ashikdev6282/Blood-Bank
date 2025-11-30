import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


const donorsRef = collection(db, "donors");



// Real-time listener for donors (for admin dashboard)
export const listenToDonors = (callback) => {
    const q = query(donorsRef, orderBy("name"));


    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));
        callback(data);
    })
}


// Add a new donor
export const addDonor = (donor) => {
    return addDoc(donorsRef, {
        ...donor,
       blocked: donor.blocked ?? false,
       createdAt: serverTimestamp(),
    });
}


// Update donor (block/unblock/edit)
export const updateDonor = (id, updates) => {
    const docRef = doc(db, "donors", id);
    return updateDoc(docRef,  updates)
}

// Remove donor
export const deleteDonor = (id) => {
    const docRef = doc(db, "donors", id);
    return deleteDoc(docRef);
}