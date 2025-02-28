import React, { createContext, ReactNode } from "react";

interface userContext {
    createUser: () => void,
    updateUser: () => void,
    emailValidation: () => void
}
const UserContext = createContext<undefined | userContext>(undefined)

export default UserContext

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const emailValidation = () => {}
    const createUser = () => {}
    const updateUser = () => {}

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