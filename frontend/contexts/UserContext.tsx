import React, { createContext, ReactNode } from "react";
import backendURL from "@/constants/constants";
import * as SecureStore from "expo-secure-store"
import {jwtDecode} from "jwt-decode"

interface userContext {
    createUser: (createData: any) => void,
    updateUser: (updateData: any, id: number) => void,
    emailValidation: (emailData: {email: string}) => void
}
type EmailValidation = {
    success: boolean,
    data: string
}
const UserContext = createContext<undefined | userContext>(undefined)

export default UserContext

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const emailValidation = async(emailData: {email: string}): Promise<EmailValidation> => {
        try{
            const response = await fetch(`${backendURL}/validate/email/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            })
            const data = await response.json()
            if (response.status === 200 && data.detail){
                console.log(data)
                return {success: true, data: data.detail}
            }else {
                const data = await response.json()
                console.log(`MIN_CREATE_USER_ERROR: ${JSON.stringify(data)}`)
                return {success: false, data: data.error}
            }
        }

        catch (error){
            console.log(`MJR_ERROR_CONFIRM_CODE: ${error}`)
            return {success: true, data: error instanceof Error ? error.message : "Network error"}
        }
    }
    const createUser = async(createData: any) => {
        try{
            const response = await fetch(`${backendURL}user/new/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createData)
            })

            if (response.status === 201){
                const data = await response.json()
                console.log(data)
                await SecureStore.setItemAsync("AuthTokens", data)
            }else {
                const data = await response.json()
                console.log(`MIN_CREATE_USER_ERROR: ${data}`)
            }
        }
        catch (error){
            console.log(`MJR_CREATE_USER_ERROR: ${error}`)
        }
    }

    const updateUser = async(updateData: any, id: number) => {
        try{
            const response = await fetch(`${backendURL}user/${id}/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateData)
            })

            if (response.status === 200){
                const data = await response.json()
                console.log(data)
            }else {
                const data = await response.json()
                console.log(`MIN_CREATE_USER_ERROR: ${data}`)
            }
        }
        catch (error){
            console.log(`MJR_ERROR_CONFIRM_CODE: ${error}`)
        }
    }

    const context = {
        createUser,
        updateUser,
        emailValidation
    }

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}