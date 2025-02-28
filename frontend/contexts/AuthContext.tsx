import React, { createContext, ReactNode, useState } from "react";

// Create Context
interface authContext{
    forgotPassword: () => void,
    login: () => void,
    confirmCode: () => void,
    logout: () => void
}
const AuthContext = createContext<undefined | authContext>(undefined);

export default AuthContext;

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const forgotPassword = () => {}
    const login = () => {}
    const confirmCode =() => {}
    const logout = () => {}

    const context = {
        forgotPassword,
        login,
        confirmCode,
        logout
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
};
