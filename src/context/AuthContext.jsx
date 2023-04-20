import { onAuthStateChanged, getAuth } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import app from "@/lib/firebase";

const AuthContext = createContext({});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(app), setUser);

        return () => unsubscribe();
    });

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>

}

export {AuthProvider, useAuthContext};