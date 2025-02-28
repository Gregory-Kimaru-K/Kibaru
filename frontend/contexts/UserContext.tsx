import React, { createContext, ReactNode } from "react";
import backendURL from "@/constants/constants";

interface userContext {
    createUser: (createData: any) => void,
    updateUser: (updateData: any, id: number) => void,
    emailValidation: (emailData: {email: string}) => void
}
const UserContext = createContext<undefined | userContext>(undefined)

export default UserContext

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const emailValidation = async(emailData: {email: string}) => {
        try{
            const response = await fetch(`${backendURL}validate/email/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            })
        }

        catch (error){
            console.log(`MJR_ERROR_CONFIRM_CODE: ${error}`)
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
        }
        catch (error){
            console.log(`MJR_ERROR_CONFIRM_CODE: ${error}`)
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