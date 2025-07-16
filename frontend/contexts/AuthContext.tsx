import React, { createContext, ReactNode, useEffect } from "react";
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
    const isTokenValid = async (token: string) => {
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decodedToken.exp > currentTime; // Check if token is expired
        }
        catch (error) {
            console.error("Error decoding token:", error);
            return false; // If there's an error, consider the token invalid
        }
    }

    const forgotPassword = async(forgData: {email: string}) => {
        try{
            const response = await fetch(`${backendURL}/validate/forgot/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(forgData)
            })
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
                return {success: true, data: data.detail}
            } else {
                const data = await response.json()
                console.log(`MIN_ERROR_FORGOT: ${JSON.stringify(data)}`)
                return {success: false, data: data.detail}
            }
        }
        catch (error){
            console.log(`MJR_ERROR_FORGOT: ${error}`)
        }
    }

    const login = async(loginData: {email: string, password: string}) => {
        try{
            const response = await fetch(`${backendURL}/tokens/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })

            if (response.status === 200) {
                const data = await response.json()
                const convert = JSON.stringify(data)
                console.log(data)
                await SecureStore.setItemAsync("AuthTokens", convert)
                return {success: true}
            } else {
                const data = await response.json()
                console.log(`MIN_ERROR_LOGIN: ${JSON.stringify(data)}`)
                return {success: false, data: data.detail}
            }
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

    const resetPassword = async (resetData: {email: string, password: string}) => {
        try {
            const response = await fetch(`${backendURL}/user/password_reset/${resetData.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"password": resetData.password})
            })

            if(response.status === 200) {
                const data = await response.json()
                console.log(data);
                return {success: true, data: data.detail};
            }
            else {
                const data = await response.json();
                console.log(`MIN_ERROR_RESET_PASSWORD: ${JSON.stringify(data)}`);
                return {success: false, data: data.error};
            }
        }
        catch (error) {
            console.log(`MJR_ERROR_RESET_PASSWORD: ${error}`);
            return {success: false, data: error instanceof Error ? error.message : "Network error"};
        }
    }


    const logout = async() => {
        await SecureStore.deleteItemAsync("AuthTokens");
        return {sucess: true};
    }

    const refreshToken = async () => {
        const storedTokens = await SecureStore.getItemAsync("AuthTokens");
        if (!storedTokens) {
            console.log("No tokens found in secure storage.");
            return {success:false, data: "No tokens found"};
        }
        const tokens = JSON.parse(storedTokens);

        if (!tokens.refresh || (await isTokenValid(tokens.refresh) === false)){
            console.log("Refresh token is invalid or expired.");
            return {success:false, data: "Refresh token is invalid or expired"};
        }

        try {
            const response = await fetch(`${backendURL}/tokens/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({refresh: tokens.refresh})
            })

            if (response.status === 200) {
                const data = await response.json();
                console.log("Tokens refreshed successfully:", data);
                await SecureStore.setItemAsync("AuthTokens", JSON.stringify(data));
                return {success: true, data: data};
            }
            else {
                const data = await response.json();
                console.log(`MIN_ERROR_REFRESH_TOKEN: ${JSON.stringify(data)}`);
                return {success: false, data: data.error};
            }
        }
        catch (error) {
            console.log(`MJR_ERROR_REFRESH_TOKEN: ${error}`);
            return {success: false, data: error instanceof Error ? error.message : "Network error"};
        }
    }

    useEffect(() => {
        const checkTokens = async () => {
            const storedTokens = await SecureStore.getItemAsync("AuthTokens");
            if (storedTokens) {
                const tokens = JSON.parse(storedTokens);
                if (!tokens.access || !tokens.refresh || (await isTokenValid(tokens.refresh) === false)) {
                    console.log("Access or refresh token is invalid or expired.");
                    await logout();
                } else if (await isTokenValid(tokens.access) === false){
                    console.log("Access token is invalid or expired, refreshing...");
                    const refreshResult = await refreshToken();
                    if (!refreshResult.success) {
                        console.log("Failed to refresh tokens, logging out.");
                        await logout();
                    }
                }
            }
        }

        let refreshInterval = setInterval(async () => {
            const storedTokens = await SecureStore.getItemAsync("AuthTokens");
            if (storedTokens) {
                const tokens = JSON.parse(storedTokens);
                if (await isTokenValid(tokens.refresh)) {
                    await refreshToken();
                } else {
                    console.log("Refresh token is invalid or expired, logging out.");
                    await logout();
                }
            }
        }, 50 * 60 * 1000);

        checkTokens();
        return () => clearInterval(refreshInterval);
    }, []);
    const context = {
        forgotPassword,
        login,
        confirmCode,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
};
