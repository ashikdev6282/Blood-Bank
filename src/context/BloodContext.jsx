import React, { createContext, useState, useEffect } from "react";
import { listenToBloodStockChanges, addBloodStockItem, updateBloodStockItem, deleteBloodStockItem, } from "../firebase_services/bloodStockService";

export const BloodContext = createContext();

export const BloodProvider = ({ children }) => {
  // 🔴 Blood stock from Firestore (live)
  const [bloodStock, setBloodStock] = useState([]);
  const [loadingStock, setLoadingStock] = useState(true);

  // 🩸 Donors (still dummy/frontend for now)
  const [donors, setDonors] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", bloodGroup: "A+", blocked: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", bloodGroup: "O-", blocked: false },
    { id: 3, name: "Raj Verma", email: "raj@example.com", bloodGroup: "B+", blocked: true },
    { id: 4, name: "Sara Khan", email: "sara@example.com", bloodGroup: "AB+", blocked: false },
    { id: 5, name: "Ali Ahmed", email: "ali@example.com", bloodGroup: "O+", blocked: false },
    { id: 6, name: "Fatima Noor", email: "fatima@example.com", bloodGroup: "A-", blocked: true },
    { id: 7, name: "Ravi Kumar", email: "ravi@example.com", bloodGroup: "B-", blocked: false },
    { id: 8, name: "Priya Singh", email: "priya@example.com", bloodGroup: "AB-", blocked: false },
    { id: 9, name: "Mohammed Ali", email: "mohammed@example.com", bloodGroup: "O-", blocked: false },
    { id: 10, name: "Anjali Mehta", email: "anjali@example.com", bloodGroup: "A+", blocked: true },
  ]);

  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);

  // 🩸 Blood drives (frontend-only for now)
  const [bloodDrives, setBloodDrives] = useState([]);

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
      description: "An indoor blood donation drive in collaboration with local NGO.",
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
      description: "Annual school-organized blood drive for parent volunteers.",
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

        // donors (frontend)
        donors,
        setDonors,

        // requests (frontend for now)
        requests,
        setRequests,

        // blood drives (frontend)
        bloodDrives,
        setBloodDrives,

        // stats
        adminStats,
        setAdminStats,

        // hosted drives
        hostedDrives,
        setHostedDrives,
        addHostedDrive,
      }}
    >
      {children}
    </BloodContext.Provider>
  );
};
