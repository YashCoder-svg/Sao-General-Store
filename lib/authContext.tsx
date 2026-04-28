"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface AuthUser {
  uid: string;
  /** Friendly display name shown in the navbar */
  displayName: string;
  isAdmin: boolean;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin session first (set by the login page on admin login)
    const adminSession = localStorage.getItem("kirana_admin_session");
    if (adminSession === "true") {
      setCurrentUser({ uid: "admin", displayName: "Admin", isAdmin: true });
      setLoading(false);
      return () => {};
    }

    // Otherwise listen to Firebase Auth state (phone-number users)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const rawPhone = firebaseUser.phoneNumber ?? "";
        // Normalize: +91 97559 84355 -> +919755984355
        const phone = rawPhone.replace(/\s+/g, "");
        
        // Try to get name from: 1. Firebase Profile, 2. LocalStorage cache, 3. Masked Phone
        let cachedName = null;
        try {
          if (typeof window !== "undefined") {
            cachedName = localStorage.getItem(`name_${phone}`);
            // Also try without + sign just in case
            if (!cachedName && phone.startsWith("+")) {
              cachedName = localStorage.getItem(`name_${phone.slice(1)}`);
            }
          }
        } catch (e) {}
        
        const nameToShow = firebaseUser.displayName || cachedName || (
          phone.length >= 4
            ? `${phone.slice(0, phone.startsWith("+91") ? 5 : 3)}•••${phone.slice(-4)}`
            : "User"
        );

        setCurrentUser({
          uid: firebaseUser.uid,
          displayName: nameToShow,
          isAdmin: false,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    localStorage.removeItem("kirana_admin_session");
    try { await signOut(auth); } catch (_) {}
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
