import React, { createContext, ReactNode } from "react";
import backendURL from "@/constants/constants";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

// Create Context
interface authContext{
    forgotPassword: (forgData: {email: string}) => void,
    login: (loginData: {email: string, password: string}) => void,
    confirmCode: (confirmData: {email: string, code: string}) => void,
    logout: () => void
}
const AuthContext = createContext<undefined | authContext>(undefined);

export default AuthContext;

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const forgotPassword = async(forgData: {email: string}) => {
        try{
            const response = await fetch(`${backendURL}/validate/forgot/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forgData)
            })
        }
        catch (error){
            console.log(`MJR_ERROR_FORGOT: ${error}`)
        }
    }

    const login = async(loginData: {email: string, password: string}) => {
        try{
            const response = await fetch(`${backendURL}tokens/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
        }
        catch (error){
            console.log(`MJR_ERROR_LOGIN: ${error}`)
        }
    }
    const confirmCode = async(confirmData: {email: string, code: string}) => {
        try{
            const response = await fetch(`${backendURL}/validate/code/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(confirmData)
            })

            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                return {success: true, data: data.detail}
            } else {
                const data = await response.json()
                console.log(`MIN_ERROR_CONFIRM_CODE: ${JSON.stringify(data)}`)
                return {success: false, data: data.error}
            }
        }
        catch (error){
            console.log(`MJR_ERROR_CONFIRM_CODE: ${error}`)
            return {success: false, data: error instanceof Error ? error.message : "Network error"}
        }
    }


    const logout = async() => {
        await SecureStore.deleteItemAsync("AuthTokens");
        return {sucess: true};
    }
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
