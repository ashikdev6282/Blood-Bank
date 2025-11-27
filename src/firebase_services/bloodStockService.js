import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";


//reference to "BloodStock" collection 
const bloooStockRef = collection(db,"bloodStock");


// Real-time listener (recommended for dashboard)
export const listenToBloodStockChanges = (callback) => {
    const q = query(bloooStockRef, orderBy("bloodGroup"));

    // onSnapshot gives you live updates
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(data);
    });
}


// One-time fetch (if you just want to load once)
export const getBloodStockOnce = async () => {
    const snapshot = await getDocs(bloooStockRef);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

// Add new stock item
export const addBloodStockItem = (item) => {
    return addDoc(bloooStockRef, {
        ...item,
        lastUpdated: serverTimestamp(),
    })
}

//   Update stock item
export const updateBloodStockItem  = (id, updates) => {
    const docRef = doc(db, "bloodStock" , id);
    return updateDoc(docRef, {
        ...updates,
        lastUpdated: serverTimestamp(),
    });
}


//  Delete stock item
export const deleteBloodStockItem  = (id) => {
    const docRef = doc(db, "bloodStock" , id);
    return deleteDoc(docRef);
}

