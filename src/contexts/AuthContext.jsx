import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [userType, setUserType] = useState(() => {
        const savedUserType = localStorage.getItem("userType");
        return savedUserType || "professor"; // Default to professor
    });

    useEffect(() => {
        localStorage.setItem("userType", userType);
    }, [userType]);

    const logout = () => {
        setUserType("professor"); // Default back to professor on logout
    };

    return (
        <AuthContext.Provider value={{ userType, setUserType, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
