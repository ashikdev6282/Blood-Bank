import React, { createContext, useState, useEffect } from "react";
import {
  listenToBloodStockChanges,
  addBloodStockItem,
  updateBloodStockItem,
  deleteBloodStockItem,
} from "../firebase_services/bloodStockService";
import {
  listenToRequests,
  addBloodRequest,
  updateRequestStatus,
  deleteRequest,
} from "../firebase_services/requestService";
import {
  listenToDonors,
  addDonor,
  updateDonor,
  deleteDonor,
} from "../firebase_services/donorService";
import {
  listenToDrives,
  addDrive,
  updateDrive,
  deleteDrive,
} from "../firebase_services/driveService";

export const BloodContext = createContext();

export const BloodProvider = ({ children }) => {
  // 🔴 Blood stock from Firestore (live)
  const [bloodStock, setBloodStock] = useState([]);
  const [loadingStock, setLoadingStock] = useState(true);

  // 🩸 Donors from Firestore (live)
  const [donors, setDonors] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(true);

  // 🆕 Requests (Firestore, live)
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [user, setUser] = useState(null);

  // 🩸 Drives from Firestore (live)
  const [bloodDrives, setBloodDrives] = useState([]);
  const [loadingDrives, setLoadingDrives] = useState(true);

  const [adminStats, setAdminStats] = useState({
    totalDrives: 8,
    totalRequests: 14,
    totalDonors: 120,
    messages: 3,
    bloodStock: [
      { bloodGroup: "A+", units: 10 },
      { bloodGroup: "B+", units: 7 },
      { bloodGroup: "O-", units: 5 },
    ],
  });

  // still frontend-only for now (e.g. for profile/history)
  const [hostedDrives, setHostedDrives] = useState([
    {
      id: 1,
      fullName: "John Doe",
      organization: "Red Cross Society",
      email: "john.doe@example.com",
      phoneNumber: "9876543210",
      date: "2025-06-15",
      time: "10:00 AM",
      location: "Community Hall, Downtown",
      driveType: "Indoor",
      expectedDonors: 45,
      specialRequirements: "Chairs, Fans",
      description:
        "An indoor blood donation drive in collaboration with local NGO.",
      agreeToContact: true,
      status: "Pending",
    },
    {
      id: 2,
      fullName: "Priya Mehra",
      organization: "TechCare Pvt Ltd",
      email: "priya.mehra@techcare.com",
      phoneNumber: "9123456789",
      date: "2025-06-20",
      time: "12:00 PM",
      location: "TechCare Campus, Noida",
      driveType: "Outdoor",
      expectedDonors: 60,
      specialRequirements: "",
      description: "Corporate social responsibility initiative.",
      agreeToContact: true,
      status: "Approved",
    },
    {
      id: 3,
      fullName: "Rahul Singh",
      organization: "Delhi Public School",
      email: "rahul.singh@dps.edu.in",
      phoneNumber: "7890123456",
      date: "2025-05-28",
      time: "9:30 AM",
      location: "DPS Auditorium, New Delhi",
      driveType: "Indoor",
      expectedDonors: 80,
      specialRequirements: "Projector, Water Bottles",
      description:
        "Annual school-organized blood drive for parent volunteers.",
      agreeToContact: true,
      status: "Completed",
    },
  ]);

  // 🆕 Add hosted drive (still frontend)
  const addHostedDrive = (drive) => {
    setHostedDrives((prev) => [...prev, { ...drive, status: "Pending" }]);
  };

  // 🔥 Connect to Firestore for blood stock (real-time)
  useEffect(() => {
    const unsubscribe = listenToBloodStockChanges((data) => {
      setBloodStock(data);
      setLoadingStock(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Connect to Firestore for requests (real-time)
  useEffect(() => {
    const unsubscribe = listenToRequests((data) => {
      setRequests(data);
      setLoadingRequests(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Connect to Firestore for donors (real-time)
  useEffect(() => {
    const unsubscribe = listenToDonors((data) => {
      setDonors(data);
      setLoadingDonors(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Connect to Firestore for drives (real-time)
  useEffect(() => {
    const unsubscribe = listenToDrives((data) => {
      setBloodDrives(data);
      setLoadingDrives(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Wrapper: Add stock (used in Blood Stock page)
  const addStock = async (item) => {
    await addBloodStockItem(item);
  };

  // 🔹 Wrapper: Update stock
  const updateStock = async (id, updates) => {
    await updateBloodStockItem(id, updates);
  };

  // 🔹 Wrapper: Delete stock
  const deleteStock = async (id) => {
    await deleteBloodStockItem(id);
  };

  // 🆕 Wrapper: Create blood request (user side)
  const createRequest = async (data) => {
    await addBloodRequest(data);
  };

  // 🆕 Wrapper: Change request status (admin side)
  const changeRequestStatus = async (id, status) => {
    await updateRequestStatus(id, status);
  };

  // 🆕 Wrapper: Remove request (admin side – optional)
  const removeRequest = async (id) => {
    await deleteRequest(id);
  };

  // 🆕 Donor wrappers (admin side)
  const addNewDonor = async (donor) => {
    await addDonor(donor);
  };

  const updateDonorInfo = async (id, updates) => {
    await updateDonor(id, updates);
  };

  const removeDonor = async (id) => {
    await deleteDonor(id);
  };

  // 🆕 Drive wrappers (user + admin)
  const addBloodDrive = async (drive) => {
    await addDrive(drive);
  };

  const updateDriveStatus = async (id, updates) => {
    await updateDrive(id, updates);
  };

  const removeDrive = async (id) => {
    await deleteDrive(id);
  };

  return (
    <BloodContext.Provider
      value={{
        // auth/user
        user,
        setUser,

        // blood stock (Firestore)
        bloodStock,
        loadingStock,
        addStock,
        updateStock,
        deleteStock,

        // donors (Firestore)
        donors,
        loadingDonors,
        addNewDonor,
        updateDonorInfo,
        removeDonor,
        // setDonors, // expose only if you still need direct state updates

        // requests (Firestore)
        requests,
        loadingRequests,
        createRequest,
        changeRequestStatus,
        removeRequest,
        // setRequests, // expose only if needed

        // blood drives (Firestore)
        bloodDrives,
        loadingDrives,
        addBloodDrive,
        updateDriveStatus,
        removeDrive,
        // setBloodDrives, // only if some legacy code still depends on it

        // stats
        adminStats,
        setAdminStats,

        // hosted drives (frontend-only)
        hostedDrives,
        setHostedDrives,
        addHostedDrive,
      }}
    >
      {children}
    </BloodContext.Provider>
  );
};
